const UserServices = require('../services/users.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv').config();

const saltRounds = 10;

class UserControllers {
    async createUser(data) {
        const { login, password } = data;
        const users = await UserServices.getUsers();
        if (users.find((item) => item.email === email)) {
            throw new Error('Логин уже используется');
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = {
            email,
            password: hashedPassword,
        };
        user.id = uuidv4();
        user.task = [];
        users.push(user);
        await UserServices.createUser(users);
        return user;
    }

    async loginUser(data) {
        const { email, password } = data;
        const users = await UserServices.getUsers();
        let findUser = users.find((item) => item.email === email);
        if (!findUser) {
            throw new Error('Пользователь не зарегистрирован');
        }
        const compareUser = await bcrypt.compare(password, findUser.password);
        if (!compareUser) {
            throw new Error('invalid password');
        }
        const token = jwt.sign(
            { id: findUser.id },
            process.env.ACCESS_TOKEN_SECRET
        );
        return token;
    }
}

module.exports = new UserControllers();
