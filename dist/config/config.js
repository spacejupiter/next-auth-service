"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
class AppConfig {
    constructor() { }
    getMongooseConnectionUri() {
        return process.env.DB_URI; //return db connection uri from envirinment variable
    }
    getJwtSecret() {
        return process.env.JWT_SECRET;
    }
    getCallBackUrl() {
        return process.env.CALLBACK_URL;
    }
}
exports.AppConfig = AppConfig;
