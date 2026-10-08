"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = require("./middleware/cors");
const errorHandler_1 = require("./middleware/errorHandler");
const health_routes_1 = __importDefault(require("./routes/health.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const metrics_routes_1 = __importDefault(require("./routes/metrics.routes"));
const operator_routes_1 = __importDefault(require("./routes/operator.routes"));
const app = (0, express_1.default)();
exports.app = app;
if (process.env.TRUST_PROXY === "true") {
    app.set("trust proxy", 1);
}
app.use(cors_1.corsMiddleware);
app.use(express_1.default.json({ limit: "16kb" }));
app.use("/", health_routes_1.default);
app.use("/api/contact", contact_routes_1.default);
app.use("/api/metrics", metrics_routes_1.default);
app.use("/api/operator", operator_routes_1.default);
app.use(errorHandler_1.errorHandler);
