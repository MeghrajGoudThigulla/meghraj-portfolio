"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corpusIndex = exports.cosineSimilarity = exports.createVector = exports.tokenize = void 0;
const corpus_json_1 = __importDefault(require("./corpus.json"));
const STOP_WORDS = new Set([
    "a", "about", "an", "and", "are", "as", "at", "be", "by", "for", "from",
    "has", "he", "in", "is", "it", "its", "of", "on", "that", "the", "to",
    "was", "were", "will", "with", "what", "which", "who", "when", "where", "how",
    "can", "do", "does", "did", "tell", "me"
]);
const tokenize = (text) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9_\s-]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
};
exports.tokenize = tokenize;
const createVector = (tokens) => {
    const map = new Map();
    for (const token of tokens) {
        map.set(token, (map.get(token) ?? 0) + 1);
    }
    return map;
};
exports.createVector = createVector;
const cosineSimilarity = (vecA, vecB) => {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (const val of vecA.values()) {
        normA += val * val;
    }
    for (const val of vecB.values()) {
        normB += val * val;
    }
    if (normA === 0 || normB === 0)
        return 0;
    for (const [key, valA] of vecA.entries()) {
        const valB = vecB.get(key);
        if (valB) {
            dotProduct += valA * valB;
        }
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};
exports.cosineSimilarity = cosineSimilarity;
class CorpusIndex {
    constructor(chunks) {
        this.chunks = chunks;
        this.chunkVectors = new Map();
        for (const chunk of this.chunks) {
            // Weight title, keywords and content
            const titleTokens = (0, exports.tokenize)(chunk.title);
            const keywordTokens = chunk.keywords.flatMap(exports.tokenize);
            const contentTokens = (0, exports.tokenize)(chunk.content);
            // Give higher weight to title and explicit keywords
            const allTokens = [
                ...titleTokens,
                ...titleTokens,
                ...keywordTokens,
                ...keywordTokens,
                ...contentTokens,
            ];
            this.chunkVectors.set(chunk.id, (0, exports.createVector)(allTokens));
        }
    }
    search(query, limit = 3) {
        const queryTokens = (0, exports.tokenize)(query);
        if (queryTokens.length === 0)
            return [];
        const queryVector = (0, exports.createVector)(queryTokens);
        const results = [];
        for (const chunk of this.chunks) {
            const chunkVector = this.chunkVectors.get(chunk.id);
            if (!chunkVector)
                continue;
            const score = (0, exports.cosineSimilarity)(queryVector, chunkVector);
            if (score > 0.05) {
                results.push({ chunk, score });
            }
        }
        results.sort((a, b) => b.score - a.score);
        return results.slice(0, limit);
    }
    getChunkById(id) {
        return this.chunks.find((c) => c.id === id);
    }
    getAllChunks() {
        return this.chunks;
    }
}
exports.corpusIndex = new CorpusIndex(corpus_json_1.default);
