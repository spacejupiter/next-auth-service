"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose = require('mongoose');
const schema = require('mongoose').Schema;
const userSchema = new schema({
    username: String,
    email: String,
    password: String,
});
exports.userModel = mongoose.model('People', userSchema);
