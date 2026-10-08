"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealth = exports.getRoot = void 0;
const database_1 = require("../config/database");
const getRoot = (_req, res) => {
    res.send("Consulting Portfolio API Active");
};
exports.getRoot = getRoot;
const getHealth = async (_req, res) => {
    try {
        await database_1.pool.query("SELECT 1");
        res.status(200).json({ status: "ok", database: "healthy" });
    }
    catch (error) {
        console.error("Health check database query failed", error);
        res.status(500).json({ status: "error", message: "Database connection failed" });
    }
};
exports.getHealth = getHealth;
