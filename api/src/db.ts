import mongoose from 'mongoose';

export const initDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string, {useNewUrlParser: true});
        console.log('DB connected...');
    } catch (error) {
        console.error(error);
    }
};