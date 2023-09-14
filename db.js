const { MongoClient } = require('mongodb');
require('dotenv').config();
const mongoClient = new MongoClient(process.env.URL);

let dbConnection;
module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(process.env.URL)
            .then((client) => {
                console.log('Connection to MongoDB');
                dbConnection = client.db();
                return cb();
            })
            .catch((err) => {
                return cb(err);
            });
    },

    getDb: () => dbConnection,
    mongoClient,
};
