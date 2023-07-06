"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const Joi = require('joi');
class AuthValidator {
    constructor() {
        this.registerationSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            repeat_password: Joi.ref('password'),
            username: Joi.string().alphanum().min(3).max(30).required(),
        });
        this.loginSchema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
        });
    }
    isSignUpValidated(data) {
        const { error } = this.registerationSchema.validate({
            username: data.username,
            email: data.email,
            password: data.password,
            repeat_password: data.repeat_password,
        });
        if (error) {
            throw new Error(error.details[0].message);
        }
        return true;
    }
    isLoginValidated(data) {
        const { error } = this.loginSchema.validate({
            email: data.email,
            password: data.password,
        });
        if (error) {
            throw new Error(error.details[0].message);
        }
        return true;
    }
}
exports.AuthValidator = AuthValidator;
