const express = require('express');
const router = express.Router();
const UsersService = require('../services/users.service');
const UsersControllers = require('../controllers/users.controller');

/**
 * @swagger
 * /api/users/login:
 *  post:
 *      summary: Check user in system
 *      tags: [Login]
 *      requestBody:
 *          required: true
 *          description: Check login and password
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      - login
 *                      - password
 *                    properties:
 *                      login:
 *                        type: string
 *                        example: Cat34
 *                      password:
 *                        type: string
 *                        example: CatCat                  
 *      responses:
 *          200:
 *              description: The user was successfully register
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          401:
 *              description: Проблемы с аутентификацией или авторизацией
 *          500:
 *              description: Some server err
 */

router.post('/login', async (req, res) => {
    try {
        const token = await UsersControllers.loginUser(req.body);
        res.send({token});
    } catch (error) {
        return res.status(401).send(error.message);
    }
});

/**
 * @swagger
 * /api/users/register:
 *  post:
 *      summary: Register a new user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          description: Register a new user
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The user was successfully register
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Some server err
 */

router.post('/register', async (req, res) => {
    try {
        await UsersControllers.createUser(req.body);
        res.send('Пользователь зарегистрирован');
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

module.exports = router;
