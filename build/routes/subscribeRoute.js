"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import isAuthenticated from '../config/isAuthenticated';
const subscribeController_1 = require("../controller/subscribeController");
const subscribeRoute = express_1.default.Router();
subscribeRoute.post('/webhook', subscribeController_1.paypalWebhook);
// subscribeRoute.post('/create', isAuthenticated, createSubscription);
// subscribeRoute.get('/plan', isAuthenticated, activeSubscription);
// subscribeRoute.post('/retry', isAuthenticated, retrySubscription);
// subscribeRoute.post('/cancel', isAuthenticated, cancelSubscription);
exports.default = subscribeRoute;
