"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const env_1 = require("../config/env");
exports.corsMiddleware = (0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || env_1.allowedOrigins.length === 0) {
            return callback(null, true);
        }
        if (env_1.allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(null, false);
    },
});
