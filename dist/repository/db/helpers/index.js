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
exports.Database = void 0;
const mongoose = require('mongoose');
class Database {
    constructor() {
        this.connectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        this.initializeModels();
    }
    initializeModels() {
        // Define your Mongoose models here
        // Example: const User = mongoose.model('User', userSchema);
    }
    connect(connectionUri) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose.connect(connectionUri, this.connectionOptions);
                console.log('Connected to the database');
            }
            catch (error) {
                console.error('Failed to connect to the database:', error);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose.disconnect();
            console.log('Disconnected from the database');
        });
    }
    insert(model, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(model);
                const document = new model(data);
                const result = yield document.save();
                console.log(result);
                return result;
            }
            catch (error) {
                console.error(`Failed to create model document:`, error);
                throw error;
            }
        });
    }
    findOne(model, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const documents = yield model.find(query);
                //console.log(query)
                //  console.log(documents)
                //console.log(model)
                return documents;
            }
            catch (error) {
                console.error(`Failed to read  documents:`, error);
                throw error;
            }
        });
    }
    update(model, query, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.updateMany(query, updateData);
                return result;
            }
            catch (error) {
                console.error(`Failed to update documents:`, error);
                throw error;
            }
        });
    }
    delete(model, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.deleteMany(query);
                return result;
            }
            catch (error) {
                console.error(`Failed to delete  documents:`, error);
                throw error;
            }
        });
    }
}
exports.Database = Database;
