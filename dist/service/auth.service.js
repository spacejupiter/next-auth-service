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
exports.AuthService = void 0;
const validation_service_1 = require("./validation.service");
const helpers_1 = require("../repository/db/helpers");
const user_model_1 = require("../repository/model/user.model");
const jwt = require('jsonwebtoken');
const config_1 = require("../config/config");
class AuthService {
    constructor() {
        this.db = new helpers_1.Database();
        this.config = new config_1.AppConfig();
        this.validator = new validation_service_1.AuthValidator();
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.validator.isSignUpValidated(data);
                const user = yield this.db.findOne(user_model_1.userModel, { email: data.email });
                console.log(user);
                if (user.length > 0) {
                    throw new Error('User already exists');
                }
                const result = yield this.db.insert(user_model_1.userModel, data);
                console.log(result);
                return result;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error('An error occurred during registration');
                }
            }
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log(data)
                yield this.validator.isLoginValidated(data);
                const user = yield this.db.findOne(user_model_1.userModel, { email: data.email });
                console.log(user);
                if (user.length > 0) {
                    console.log(user);
                    //generate jwt payload
                    const jwtPayload = { id: user[0]._id, email: user[0].email };
                    const token = yield jwt.sign(jwtPayload, this.config.getJwtSecret(), {
                        expiresIn: '1h',
                    });
                    return token;
                }
                else {
                    throw Error('user not found');
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error('An error occurred during login');
                }
            }
        });
    }
}
exports.AuthService = AuthService;
