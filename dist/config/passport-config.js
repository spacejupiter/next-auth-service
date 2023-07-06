"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassportStrategy = void 0;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();
const config_1 = require("./config");
class PassportStrategy {
    constructor() {
        this.config = new config_1.AppConfig();
        // this.useLocalStrategy()
        this.useFacebookStrategy();
        this.useJwtLocalStrategy();
        //this.useGoogleStrategy()
        this.opts = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.config.getJwtSecret() ||
                '939837JJDHSHHHGDT536656372GBSGGDAGHGDT6636GF',
        };
    }
    useLocalStrategy() {
        passport.use(new LocalStrategy((username, password, done) => {
            // Custom authentication logic for local strategy
        }));
    }
    useJwtLocalStrategy() {
        passport.use(new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.config.getJwtSecret(),
        }, (jwtPayload, done) => {
            //query db
            const user = { id: jwtPayload.id, username: jwtPayload.username };
            return done(null, user);
        }));
    }
    useFacebookStrategy() {
        passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            enableProof: true,
            passReqToCallback: true,
            proxy: true,
        }, (accessToken, refreshToken, profile, done) => {
            // Custom authentication logic for Facebook strategy
        }));
    }
    useGoogleStrategy() {
        passport.use(new GoogleStrategy({
        // Configuration options for Google strategy
        }, (accessToken, refreshToken, profile, done) => {
            // Custom authentication logic for Google strategy
        }));
    }
}
exports.PassportStrategy = PassportStrategy;
