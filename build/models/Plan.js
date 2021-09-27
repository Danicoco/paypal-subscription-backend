"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PlanSchema = new mongoose_1.Schema({
    type: {
        type: String
    },
    status: {
        type: String
    },
    subscriptionId: {
        type: String
    },
    priceId: {
        type: String
    },
    user: {
        id: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        },
        email: String
    } //associate user to plan
});
PlanSchema.set('timestamps', true);
const Plan = mongoose_1.model('Plan', PlanSchema);
exports.default = Plan;
