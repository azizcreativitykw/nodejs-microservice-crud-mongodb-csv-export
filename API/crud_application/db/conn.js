const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://test_username:test_password@cluster0.mdsrmaj.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

// Database Name
const dbName = 'TensorGo';

async function dbInit() {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('master');
        console.log('collection created successfully');
        return [client, collection]
    } catch (e) {
        console.log('err',e)
        return e;
    }
}

module.exports = {dbInit}

