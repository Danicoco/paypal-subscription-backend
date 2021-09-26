"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Application source file
 */
const express_1 = __importDefault(require("express"));
require("./config/dbconfig");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
//allow cors from specific region
app.use(cors_1.default({
    origin: 'http://localhost:3000',
}));
app.use(express_1.default.json());
//application routes
app.use('/api/v1', routes_1.default);
app.listen(process.env.PORT, () => console.log(`Server connected at ${process.env.PORT}`));
