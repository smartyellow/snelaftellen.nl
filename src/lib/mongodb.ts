import { MongoClient, type MongoClientOptions } from 'mongodb';

const uri = process.env.DB_URL || 'mongodb://localhost:27017/snelaftellen';
const params: MongoClientOptions = {};
export const client = new MongoClient(uri, params);
export const db = client.db(process.env.DB_NAME || 'snelaftellen');
