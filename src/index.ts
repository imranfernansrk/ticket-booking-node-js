import * as express from "express";
import { Application } from "express";
import * as bodyParser from "body-parser";
import * as http from "http";
import {initialRoutes} from './Routes/index'
import * as cors  from "cors";
import * as mongoose from 'mongoose';
require("dotenv").config();

class App{
    expressApp: Application;
    initialroutes: initialRoutes = new initialRoutes();

    constructor() {
        this.expressApp = express();
        this.config();
        this.portSetup();
        this.initialroutes.initialRoutes(this.expressApp)
        this.mongoSetup();
    }
    config() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(cors({ credentials: true, origin: true , }));
    }
    portSetup() {
        http.createServer(this.expressApp).listen(process.env.PORT);
    }
    mongoSetup() {
        mongoose.connect(process.env.DATABASE_URL,{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, ()=>console.log('Databse Connected'));
    }
}
export default new App().expressApp;