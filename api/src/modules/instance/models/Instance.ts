import mongoose from 'mongoose';

const instanceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
});

export const Instance = mongoose.model('Instance', instanceSchema);