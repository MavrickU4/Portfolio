/*
File: 
*/

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const logsSchema = new Schema({
    date: String,
    username: String,
    userType: String,
    action: String
}, {
    timestamps: true,
    collection: 'logs'
});

export default mongoose.model('Logs', logsSchema);