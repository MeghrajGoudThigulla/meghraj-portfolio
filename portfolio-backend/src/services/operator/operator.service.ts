import { corpusIndex, type SearchResult } from "./retrieval";
import { geminiApiKey, groqApiKey } from "../../config/env";

export type OperatorResponse = {
  answer: string;
  sourceIds: string[];
  confidence: number;
};

const INJECTION_PATTERNS = [
  /ignore (all |previous |prior )?instructions/i,
  /system (prompt|instructions|directive)/i,
  /dan mode/i,
  /jailbreak/i,
  /reveal (the |your )?prompt/i,
  /<script/i,
  /javascript:/i,
  /drop table/i,
  /union select/i,
];

const PII_QUERY_PATTERNS = [
  /(phone|telephone|mobile number|whatsapp|call him)/i,
  /(exact salary|compensation|how much does he make|pay rate)/i,
];

export const isMaliciousOrOutOfScope = (query: string): { blocked: boolean; reason?: string } => {
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(query)) {
      return { blocked: true, reason: "injection" };
    }
  }

  for (const pattern of PII_QUERY_PATTERNS) {
    if (pattern.test(query)) {
      return { blocked: true, reason: "pii" };
    }
  }

  return { blocked: false };
};

export const queryOperator = async (
  rawQuery: string,
): Promise<OperatorResponse> => {
  const query = rawQuery.trim();

  if (!query || query.length > 500) {
    return {
      answer: "Please provide a concise question under 500 characters regarding Meghraj's engineering portfolio.",
      sourceIds: [],
      confidence: 0,
    };
  }

  const check = isMaliciousOrOutOfScope(query);
  if (check.blocked) {
    if (check.reason === "pii") {
      return {
        answer: "Direct telephone numbers and compensation numbers are not shared through the public operator. Please contact Meghraj directly via email at meghraj.thigulla@outlook.com or through LinkedIn.",
        sourceIds: ["dossier_boundaries"],
        confidence: 1.0,
      };
    }
    return {
      answer: "I am programmed to discuss only Meghraj's verified engineering architecture, portfolio projects, and technical consulting experience.",
      sourceIds: [],
      confidence: 0,
    };
  }

  const searchResults: SearchResult[] = corpusIndex.search(query, 3);

  // If no chunks match or top chunk similarity is very low, abstain
  if (searchResults.length === 0 || searchResults[0].score < 0.12) {
    return {
      answer: "I don't have enough verified information in the portfolio dossier to answer that accurately. I can discuss Meghraj's backend architecture (286 endpoints), projects like TFGenAPI, IYOV AI, or TFG SecureBank, and technical consulting.",
      sourceIds: [],
      confidence: 0,
    };
  }

  const allowedSourceIds = searchResults.map((r) => r.chunk.id);
  const contextText = searchResults
    .map((r) => `[Source: ${r.chunk.id}] ${r.chunk.title}: ${r.chunk.content}`)
    .join("\n\n");

  // 1. If Groq API Key is present and not testing, attempt Groq completion (ultra-low latency)
  if (groqApiKey && process.env.NODE_ENV !== "test") {
    try {
      const systemPrompt = `You are "The Operator", a grounded portfolio technical assistant for Meghraj Goud (Senior AI Developer & Full Stack Engineer).
Answer the user's question accurately, concisely, and factually using ONLY the provided context below.
Do not invent facts, projects, or statistics. If the context does not contain the answer, politely abstain.

CONTEXT:
${contextText}

Respond with valid JSON:
{
  "answer": "string (concise, factual explanation, max 3-4 sentences)",
  "sourceIds": ["list of source IDs from the context used in your answer"]
}`;

      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: query },
          ],
          response_format: { type: "json_object" },
          temperature: 0.2,
        }),
      });

      if (groqRes.ok) {
        const json = (await groqRes.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const textResponse = json.choices?.[0]?.message?.content;
        if (textResponse) {
          const parsed = JSON.parse(textResponse) as {
            answer?: string;
            sourceIds?: string[];
          };
          if (parsed.answer && Array.isArray(parsed.sourceIds)) {
            const validatedSources = parsed.sourceIds.filter((id) =>
              allowedSourceIds.includes(id),
            );
            return {
              answer: parsed.answer,
              sourceIds: validatedSources,
              confidence: Number(searchResults[0].score.toFixed(2)),
            };
          }
        }
      }
    } catch (groqError) {
      console.warn("[operator] Groq LLM call failed, checking secondary providers", groqError);
    }
  }

  // 2. If Gemini API Key is present and not testing, attempt Gemini completion
  if (geminiApiKey && process.env.NODE_ENV !== "test") {
    try {
      const prompt = `You are "The Operator", a grounded portfolio technical assistant for Meghraj Goud (Senior AI Developer & Full Stack Engineer).
Answer the user's question accurately, concisely, and factually using ONLY the provided context below.
Do not invent facts, projects, or statistics. If the context does not contain the answer, politely abstain.

CONTEXT:
${contextText}

QUESTION:
${query}

Respond with valid JSON containing:
{
  "answer": "string (concise, factual explanation, max 3-4 sentences)",
  "sourceIds": ["list of source IDs from the context used in your answer"]
}`;

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;
      const apiResponse = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        }),
      });

      if (apiResponse.ok) {
        const json = (await apiResponse.json()) as {
          candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
        };
        const textResponse = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textResponse) {
          const parsed = JSON.parse(textResponse) as {
            answer?: string;
            sourceIds?: string[];
          };
          if (parsed.answer && Array.isArray(parsed.sourceIds)) {
            const validatedSources = parsed.sourceIds.filter((id) =>
              allowedSourceIds.includes(id),
            );
            return {
              answer: parsed.answer,
              sourceIds: validatedSources,
              confidence: Number((searchResults[0].score).toFixed(2)),
            };
          }
        }
      }
    } catch (llmError) {
      console.warn("[operator] Gemini LLM call failed, falling back to deterministic grounding", llmError);
    }
  }

  // Deterministic grounded response generation (offline / fallback / test mode)
  const topChunk = searchResults[0].chunk;
  const supportingChunk = searchResults[1]?.chunk;
  const answer = supportingChunk && searchResults[1].score > 0.2
    ? `${topChunk.content} Additionally, ${supportingChunk.content}`
    : topChunk.content;

  const validSourceIds = [
    topChunk.id,
    ...(supportingChunk && searchResults[1].score > 0.2 ? [supportingChunk.id] : []),
  ];

  return {
    answer,
    sourceIds: validSourceIds,
    confidence: Number(searchResults[0].score.toFixed(2)),
  };
};
