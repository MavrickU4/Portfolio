import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    title: String,
    description: String,
    skills: String,
    priority: String,
    url: String,
    imgUrl: String,
    status: String,
    classType: String,
    features: String,
}, {
    timestamps: true,
    collection: 'services'
});

export default mongoose.model('Services', serviceSchema);