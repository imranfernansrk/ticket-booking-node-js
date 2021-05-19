import * as mongoose from "mongoose";
import { Schema } from "mongoose";

const UserTemp: Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    ticketIds: {
        type: [String],
        required: true
    }
})

export default mongoose.model('userTable', UserTemp)