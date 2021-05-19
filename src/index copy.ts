import * as express from 'express';
import * as http from "http";
import * as cors from "cors";
require("dotenv").config();

var mongoose = require('mongoose');
var routeURLs = require('./Route/Routers');

// const DATABASE_URL = "mongodb://imran:imran@cluster0-shard-00-00.fttr1.mongodb.net:27017,cluster0-shard-00-01.fttr1.mongodb.net:27017,cluster0-shard-00-02.fttr1.mongodb.net:27017/ticketTable?ssl=true&replicaSet=atlas-ncixya-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect(process.env.DATABASE_URL,{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, ()=>console.log('Databse Connected'));

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', routeURLs);

http.createServer(app).listen(process.env.PORT);