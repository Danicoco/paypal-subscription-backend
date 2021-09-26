"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-auth-token');
    try {
        if (!token || token === null)
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            });
        //decode jwt
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWTSEC || "");
        //verify user from db
        const user = yield models_1.User.findOne().where('_id').equals(decoded.id);
        if (!user || user === null)
            return res.status(400).json({
                success: false,
                message: "Invalid User"
            });
        req.user = {
            id: user._id
        };
        return next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Session expired. Please sign in."
        });
    }
});
exports.default = isAuthenticated;
