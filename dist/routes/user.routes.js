"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const catchAsync_1 = require("../utils/catchAsync");
const router = (0, express_1.Router)();
router.post("/", (0, catchAsync_1.catchAsync)(users_controller_1.createUser));
exports.default = router;
