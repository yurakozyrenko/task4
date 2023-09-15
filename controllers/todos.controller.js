const { mongoClient } = require('../db');
const { ObjectId } = require('mongodb');

class ToDosControllers {
    async getToDos(user) {
        const connection = await mongoClient.connect();
        const db = await connection.db('ToDo');
        const toDos = await db
            .collection('ToDos')
            .find({ idUser: user.id })
            .toArray();
        connection.close();
        return toDos;
    }

    async createToDo(toDo, user) {
        const connection = await mongoClient.connect();
        const db = await connection.db('ToDo');

        toDo.isCompleted = false;
        toDo.idUser = user.id;
        await db.collection('ToDos').insertOne(toDo);

        connection.close();
        return toDo;
    }

    async patchToDo(newTitle, id, user) {
        const connection = await mongoClient.connect();
        const db = await connection.db('ToDo');

        const updateToDo = await db
            .collection('ToDos')
            .findOneAndUpdate(
                { _id: new ObjectId(id), idUser: user.id },
                { $set: { title: newTitle.title } },
                { returnDocument: 'after' }
            );

        if (!updateToDo) {
            throw new Error('У пользователя нет task c указанным id');
        }

        connection.close();
        return updateToDo;
    }

    async deleteToDo(id, user) {
        const connection = await mongoClient.connect();
        const db = await connection.db('ToDo');

        const result = await db
            .collection('ToDos')
            .findOneAndDelete(
                { _id: new ObjectId(id), idUser: user.id },
                { returnNewDocument: true }
            );
        if (!result) {
            return 'false';
        }
        connection.close();
        return true;
    }

    async patchToDoStatus(id, user) {
        const connection = await mongoClient.connect();
        const db = await connection.db('ToDo');

        const findToDo = await db
            .collection('ToDos')
            .findOne({ _id: new ObjectId(id), idUser: user.id });

        if (findToDo) {
            const newValue = !findToDo.isCompleted;
            const updateToDo = await db
                .collection('ToDos')
                .findOneAndUpdate(
                    { _id: new ObjectId(id), idUser: user.id },
                    { $set: { isCompleted: newValue } },
                    { returnDocument: 'after' }
                );
            connection.close();
            return updateToDo;
        } else {
            throw new Error('У пользователя нет task c указанным id');
        }
    }
}

module.exports = new ToDosControllers();
