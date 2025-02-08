import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const adSchema = new Schema({
    adTitle: String,
    adStatus: String,
    description: String,
    priority: String,
    emailAddress: String,
    phoneNumber: String,
    adImg: String
}, {
    timestamps: true,
    collection: 'ad'
});

export default mongoose.model('Ads', adSchema);