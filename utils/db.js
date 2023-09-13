const MongoClient = require('mongodb').MongoClient;

async function startDb() {
    await MongoClient.connect(
        'mongodb+srv://yurikozyrenko:N1357=Dt@cluster0.6xqtrex.mongodb.net/ToDo?retryWrites=true&w=majority',
        {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        },
        (err) => {
            if (err) {
                return console.log(err);
            }
        }
    );
}

module.exports = startDb;
