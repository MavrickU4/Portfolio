import dotenv from 'dotenv';
dotenv.config();

export const Secret = process.env.SESSION_SECRET;
export const MongoURI = process.env.MONGO_DB_URI;