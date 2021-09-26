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
exports.productAccess = exports.allowLogin = exports.getUser = exports.createUser = void 0;
const models_1 = require("../models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const user = yield models_1.User.findOne().where('email').equals(email);
        if (user)
            return res.status(400).json({
                success: false,
                message: "You already have an account. Kindly login"
            });
        //validate input on the server too. Will be skipping that for this project
        //hash password
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(password, salt);
        //create new user
        const new_user = yield new models_1.User({ name, email, password: hash });
        //create plan for user - Trial plan by default
        // const new_plan = await new Plan({ type: 'trial', status: 'incomplete', stripeId: customer.id });
        // new_plan.user.id = new_user._id;
        // new_plan.user.email = new_user.email;
        // await new_plan.save();
        yield new_user.save();
        return res.status(200).json({
            success: true,
            data: 'New user successfully created'
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});
exports.createUser = createUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    try {
        const user = yield models_1.User.findOne().where('_id').equals(id).select('-password');
        if (!user || user === null)
            return res.status(401).json({
                success: false,
                message: "Appears your session have expired. Please login again"
            });
        return res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});
exports.getUser = getUser;
const allowLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield models_1.User.findOne().where('email').equals(email);
        if (!user || user === null)
            return res.status(401).json({
                success: false,
                message: "Invalid combination of email/password"
            });
        //compare password
        const isMatch = bcryptjs_1.default.compareSync(password, user.password);
        if (isMatch === false)
            return res.status(400).json({
                success: false,
                message: "Invalid combination of email/password"
            });
        const token = yield jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWTSEC || "", { expiresIn: 60 * 60 }); //token expires in 1 hour
        return res.status(200).json({
            success: true,
            data: {
                token,
                user: {
                    id: user._id,
                    email: user.email,
                }
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});
exports.allowLogin = allowLogin;
const productAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    try {
        const user = yield models_1.User.findOne().where('_id').equals(id);
        if (!user || user === null)
            return res.status(401).json({
                success: false,
                message: "Appears your session expires. Please login again"
            });
        return res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});
exports.productAccess = productAccess;
