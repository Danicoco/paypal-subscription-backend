"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./userRoute"));
const subscribeRoute_1 = __importDefault(require("./subscribeRoute"));
const router = express_1.default.Router();
router.use('/users', userRoute_1.default);
router.use('/subscribe', subscribeRoute_1.default);
exports.default = router;
