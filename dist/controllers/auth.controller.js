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
exports.AuthController = void 0;
const passport = require('passport');
class AuthController {
    constructor(rest, service) {
        this.rest = rest;
        this.service = service;
        //initiallise routers to listen for request
        this.setupRoutes();
    }
    setupRoutes() {
        this.rest.post('api/login/:local', this.loginWithLocalStrategy.bind(this));
        this.rest.post('api/login/:google', this.loginWithGoogleStrategy.bind(this));
        this.rest.post('/api/login/facebook', this.loginWithFaceBookStrategy.bind(this));
        this.rest.get('/test', this.loginTest.bind(this));
        this.rest.post('/api/login/', this.loginTest.bind(this));
        this.rest.post('/api/login/local', this.loginWithJwt.bind(this));
        this.rest.post('/api/auth/register', this.register.bind(this));
        this.rest.get('auth/facebook/callback', this.handleCallBack.bind(this));
        this.rest.get('/api/user', passport.authenticate('jwt', { session: false }), this.getUser.bind(this));
    }
    loginWithLocalStrategy(req, res) {
        //passport.authenticate('local', (err: Error, user: any, info: any) => {
        // Handle authentication result
        // ...
        // })(req, res)
    }
    loginWithGoogleStrategy(req, res) {
        //passport.authenticate('google', { scope: ['profile', 'email'] })(req, res)
    }
    loginWithFaceBookStrategy(req, res) {
        passport.authenticate('facebook', { scope: 'email' })(req, res);
    }
    loginTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.redirect('https://facebook.com');
        });
    }
    loginWithJwt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.service.login(req.body);
                return res.status(200).json(token);
            }
            catch (error) {
                if (error instanceof Error && error.message) {
                    return res.status(400).send(error.message); // Send the error message
                }
                else {
                    return res.status(400).send('An error occurred during login'); // Fallback error message
                }
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.service.register(req.body);
                return res.status(201).json(result);
            }
            catch (error) {
                if (error instanceof Error && error.message) {
                    return res.status(400).send(error.message); // Send the error message
                }
                else {
                    return res.status(400).send('An error occurred during registration'); // Fallback error message
                }
            }
        });
    }
    handleCallBack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //handle
            console.log('handle it');
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send('loginsss');
        });
    }
}
exports.AuthController = AuthController;
