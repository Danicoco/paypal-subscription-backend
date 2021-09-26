"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const isAuthenticated_1 = __importDefault(require("../config/isAuthenticated"));
const userRoute = express_1.default.Router();
userRoute.post('/', userController_1.createUser);
userRoute.get('/', isAuthenticated_1.default, userController_1.getUser);
userRoute.post('/login', userController_1.allowLogin);
exports.default = userRoute;
