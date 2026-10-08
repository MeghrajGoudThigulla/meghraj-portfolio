"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const operator_controller_1 = require("../controllers/operator.controller");
const router = (0, express_1.Router)();
router.post("/", operator_controller_1.postOperator);
exports.default = router;
