"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modules = void 0;
const auth_controller_1 = require("./controllers/auth.controller");
const auth_service_1 = require("./service/auth.service");
class Modules {
    constructor(route) {
        this.route = route;
        this.register();
    }
    register() {
        new auth_controller_1.AuthController(this.route, new auth_service_1.AuthService());
    }
}
exports.Modules = Modules;
