import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: String,
    description: String,
    skills: String,
    priority: String,
    url: String,
    imgUrl: String,
    status: String
}, {
    timestamps: true,
    collection: 'projects'
});

export default mongoose.model('Projects', projectSchema);