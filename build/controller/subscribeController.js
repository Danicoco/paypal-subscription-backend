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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paypalWebhook = void 0;
const models_1 = require("../models");
const paypalWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { event_type } = req.body;
    try {
        //get customer/user id
        //this was added to PayPal smart subscription button
        //custom customer informatin can be found in resource object
        const custom_id = req.body.resource.custom_id;
        // get price_id to know which plan the user subscribe to
        const plan_Id = req.body.resource.plan_id;
        //get current subscription id
        const subscriptionId = req.body.resource.id;
        if (event_type === "BILLING.SUBSCRIPTION.ACTIVATED") {
            const plan = yield models_1.Plan.findOne().where('user.id').equals(custom_id);
            if (!plan || plan === null)
                return;
            if (plan_Id === process.env.SILVERPLANID) {
                //update plan status
                const update = { type: "silver", status: "active", subscriptionId, price_id: plan_Id };
                yield models_1.Plan.updateOne({ _id: plan._id }, update, { new: true });
                return;
            }
            if (plan_Id === process.env.GOLDPLANID) {
                //update plan status
                const update = { type: "gold", status: "active", subscriptionId, price_id: plan_Id };
                yield models_1.Plan.updateOne({ _id: plan._id }, update, { new: true });
                return;
            }
        }
        if (event_type === "BILLING.SUBSCRIPTION.CANCELLED") {
            const plan = yield models_1.Plan.findOne().where('user.id').equals(custom_id);
            if (!plan || plan === null)
                return;
            //update plan status
            const update = { type: "none", status: "cancel", subscriptionId, price_id: plan_Id };
            yield models_1.Plan.updateOne({ _id: plan._id }, update, { new: true });
            return;
        }
        if (event_type === "BILLING.SUBSCRIPTION.EXPIRED") {
            const plan = yield models_1.Plan.findOne().where('user.id').equals(custom_id);
            if (!plan || plan === null)
                return;
            //update plan status
            const update = { type: "none", status: "expired", subscriptionId, price_id: plan_Id };
            yield models_1.Plan.updateOne({ _id: plan._id }, update, { new: true });
            return;
        }
        //you can listen to other types of event_type
        //as your app needs
        return res.status(200).json({
            data: "Data received"
        });
    }
    catch (error) {
        const new_errorlog = yield new models_1.ErrorLog({ type: "subscription error", message: error.message });
        yield new_errorlog.save();
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.paypalWebhook = paypalWebhook;
