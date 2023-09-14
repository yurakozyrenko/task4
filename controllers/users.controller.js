const { mongoClient } = require('../db');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

class UserControllers {
    async createUser(data) {
        const { email, password } = data;
        const connection = await mongoClient.connect();
        const db = await connection.db('ToDo');

        const users = await db
            .collection('Users')
            .find({ email: email })
            .toArray();

        if (users.length !== 0) {
            throw new Error('Логин уже используется');
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = {
            email,
            password: hashedPassword,
        };
        await db.collection('Users').insertOne(user);
        connection.close();
        return user;
    }

    async loginUser(data) {
        const { email, password } = data;
        const connection = await mongoClient.connect();
        const db = await connection.db('ToDo');

        const findUser = await db
            .collection('Users')
            .findOne({ email: email }, { returnDocument: 'after' });

            if (!findUser) {
            throw new Error('Пользователь не зарегистрирован');
        }

        const compareUser = await bcrypt.compare(password, findUser.password);
        if (!compareUser) {
            throw new Error('invalid password');
        }
        const token = jwt.sign(
            { id: findUser._id },
            process.env.ACCESS_TOKEN_SECRET
        );
        connection.close();
        return token;
    }
}
module.exports = new UserControllers();
