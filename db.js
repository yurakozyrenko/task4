const { MongoClient } = require('mongodb');
const URL =
    'mongodb+srv://yurikozyrenko:N1357=Dt@cluster0.6xqtrex.mongodb.net/ToDo?retryWrites=true&w=majority';

const mongoClient = new MongoClient(URL);

let dbConnection;
module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(URL)
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
