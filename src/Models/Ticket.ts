var mongoose = require('mongoose');
import { Schema } from "mongoose";

const TicketTemp: Schema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true
    },
    movieStartTime: {
        type: String,
        required: true
    },
    movieEndTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})
export default mongoose.model('ticketTable', TicketTemp);