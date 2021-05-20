import * as express from 'express';
import { Application } from "express";
import * as http from "http";
import * as cors from "cors";
require("dotenv").config();

var mongoose = require('mongoose');
var routeURLs = require('./Route/Routers');

mongoose.connect(process.env.DATABASE_URL,{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, ()=>console.log('Databse Connected'));

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', routeURLs);

http.createServer(app).listen(process.env.PORT);