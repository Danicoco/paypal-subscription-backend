"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ErrorLogSchema = new mongoose_1.Schema({
    type: {
        type: String
    },
    message: {
        type: String
    }
});
ErrorLogSchema.set('timestamps', true);
const ErrorLog = mongoose_1.model('ErrorLog', ErrorLogSchema);
exports.default = ErrorLog;
