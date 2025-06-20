"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_routes_1 = __importDefault(require("./report.routes"));
const health_routes_1 = __importDefault(require("./health.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const router = (0, express_1.Router)();
router.use("/reports", report_routes_1.default);
router.use("/health", health_routes_1.default);
router.use("/users", user_routes_1.default);
exports.default = router;
