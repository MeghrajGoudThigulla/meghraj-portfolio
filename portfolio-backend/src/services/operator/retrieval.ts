import corpusData from "./corpus.json";

export type CorpusChunk = {
  id: string;
  category: string;
  title: string;
  keywords: string[];
  content: string;
};

export type SearchResult = {
  chunk: CorpusChunk;
  score: number;
};

const STOP_WORDS = new Set([
  "a", "about", "an", "and", "are", "as", "at", "be", "by", "for", "from",
  "has", "he", "in", "is", "it", "its", "of", "on", "that", "the", "to",
  "was", "were", "will", "with", "what", "which", "who", "when", "where", "how",
  "can", "do", "does", "did", "tell", "me"
]);

export const tokenize = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9_\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
};

export const createVector = (tokens: string[]): Map<string, number> => {
  const map = new Map<string, number>();
  for (const token of tokens) {
    map.set(token, (map.get(token) ?? 0) + 1);
  }
  return map;
};

export const cosineSimilarity = (
  vecA: Map<string, number>,
  vecB: Map<string, number>,
): number => {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const val of vecA.values()) {
    normA += val * val;
  }
  for (const val of vecB.values()) {
    normB += val * val;
  }

  if (normA === 0 || normB === 0) return 0;

  for (const [key, valA] of vecA.entries()) {
    const valB = vecB.get(key);
    if (valB) {
      dotProduct += valA * valB;
    }
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

class CorpusIndex {
  private chunks: CorpusChunk[];
  private chunkVectors: Map<string, Map<string, number>>;

  constructor(chunks: CorpusChunk[]) {
    this.chunks = chunks;
    this.chunkVectors = new Map();

    for (const chunk of this.chunks) {
      // Weight title, keywords and content
      const titleTokens = tokenize(chunk.title);
      const keywordTokens = chunk.keywords.flatMap(tokenize);
      const contentTokens = tokenize(chunk.content);

      // Give higher weight to title and explicit keywords
      const allTokens = [
        ...titleTokens,
        ...titleTokens,
        ...keywordTokens,
        ...keywordTokens,
        ...contentTokens,
      ];

      this.chunkVectors.set(chunk.id, createVector(allTokens));
    }
  }

  public search(query: string, limit = 3): SearchResult[] {
    const queryTokens = tokenize(query);
    if (queryTokens.length === 0) return [];

    const queryVector = createVector(queryTokens);
    const results: SearchResult[] = [];

    for (const chunk of this.chunks) {
      const chunkVector = this.chunkVectors.get(chunk.id);
      if (!chunkVector) continue;

      const score = cosineSimilarity(queryVector, chunkVector);
      if (score > 0.05) {
        results.push({ chunk, score });
      }
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, limit);
  }

  public getChunkById(id: string): CorpusChunk | undefined {
    return this.chunks.find((c) => c.id === id);
  }

  public getAllChunks(): CorpusChunk[] {
    return this.chunks;
  }
}

export const corpusIndex = new CorpusIndex(corpusData as CorpusChunk[]);
