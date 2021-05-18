import * as express from 'express';
import * as http from "http";
import * as dotenv from "dotenv";
import * as cors from "cors";

var mongoose = require('mongoose');
var routeURLs = require('./Route/Routers');

dotenv.config();

// const DATABASE_URL = "mongodb+srv://imran:imran@cluster0.fttr1.mongodb.net/ticketTable?retryWrites=true&w=majority";
const DATABASE_URL = "mongodb://imran:imran@cluster0-shard-00-00.fttr1.mongodb.net:27017,cluster0-shard-00-01.fttr1.mongodb.net:27017,cluster0-shard-00-02.fttr1.mongodb.net:27017/ticketTable?ssl=true&replicaSet=atlas-ncixya-shard-0&authSource=admin&retryWrites=true&w=majority"
console.log('url', DATABASE_URL);
mongoose.connect(DATABASE_URL,{ useUnifiedTopology: true, useNewUrlParser: true }, ()=>console.log('Databse Connected'));

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', routeURLs);

http.createServer(app).listen(3000);