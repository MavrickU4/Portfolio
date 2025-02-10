import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const skillsSchema = new Schema({
    title: String,
    description: String,
    level: Number,
    url: String,
    imgUrl: String,
    status: String,
    classType: String,
    features: String,
}, {
    timestamps: true,
    collection: 'skills'
});

export default mongoose.model('Skills', skillsSchema);