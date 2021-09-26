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
exports.paypalWebhook = void 0;
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
paypal_rest_sdk_1.default.configure({
    'mode': 'sandbox',
    'client_id': process.env.PAYPALCLIENT || "",
    'client_secret': process.env.PAYPALSECRET || ""
});
// const webhookID = "74F20667KF166590H"
paypal_rest_sdk_1.default.notification.webhookEventType.list(function (error, webhookEventTypes) {
    if (error) {
        throw error;
    }
    else {
        console.log("List webhookEventTypes Response");
        console.log(webhookEventTypes);
    }
});
const paypalWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        return res.status(200).json({
            data: "Data received"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.paypalWebhook = paypalWebhook;
