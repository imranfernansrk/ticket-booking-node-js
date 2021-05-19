import * as express from "express";
import { Application } from "express";
import * as bodyParser from "body-parser";
import * as http from "http";
// import * as routeUrls from "./Routes/Routers";
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
    // var routeURLs = require('./Route/Routers');
    
    // const DATABASE_URL = "mongodb://imran:imran@cluster0-shard-00-00.fttr1.mongodb.net:27017,cluster0-shard-00-01.fttr1.mongodb.net:27017,cluster0-shard-00-02.fttr1.mongodb.net:27017/ticketTable?ssl=true&replicaSet=atlas-ncixya-shard-0&authSource=admin&retryWrites=true&w=majority"
    // mongoose.connect(process.env.DATABASE_URL,{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, ()=>console.log('Databse Connected'));
    
    // const app = express();
    // app.use(express.json());
    // app.use(cors());
    // app.use('/api', routeURLs);
    
    // http.createServer(app).listen(process.env.PORT);
}