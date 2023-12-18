import { MONGODB_USER, MONGODB_PASSWORD } from '$env/static/private';
import mongoose from 'mongoose';

const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.egzwo.mongodb.net/practice?retryWrites=true&w=majority`;
// const localURI = 'mongodb://localhost:27017/practice';

// const client = new MongoClient(uri);

// export function start_mongo() {
// 	console.log('Starting mongo...');
// 	return client.connect();
// }

// export default client.db();

export async function bootStrap() {
	try {
		await mongoose.connect(uri);
		console.log('MongoDB connected Successfully!');
	} catch (err) {
		console.log('Failed to connect MongoDB ', err);
	}
}
