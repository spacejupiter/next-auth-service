"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const cors = require('cors');
const passport_config_1 = require("./config/passport-config");
const appmodule_1 = require("./appmodule");
const config_1 = require("./config/config");
const helpers_1 = require("./repository/db/helpers");
class Server {
    constructor() {
        this.app = express();
        this.config = new config_1.AppConfig();
    }
    run() {
        this.configure();
    }
    configure() {
        this.app.use(cors({
            origin: 'http://localhost:3000',
            method: 'GET,POST,PUT,DELETE',
            credentials: true,
        }));
        console.log('using cors');
        //connect to database
        new helpers_1.Database().connect(this.config.getMongooseConnectionUri());
        //configure express server
        this.app.use(session({
            secret: 'your-secret-key',
            resave: false,
            saveUninitialized: false,
        }));
        this.app.use(express.json());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        //call modules aggregator
        new appmodule_1.Modules(this.app);
        new passport_config_1.PassportStrategy(); //Initialize the passport strategy class
        const port = 4700;
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}
exports.Server = Server;
const server = new Server();
//start the express server
server.run();
