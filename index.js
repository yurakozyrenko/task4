const express = require('express');
const app = express();
const Sentry = require("@sentry/node");
require('dotenv').config();
const bodyParser = require('body-parser');

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Users API',
            version: '1.0.0',
            description: 'Users API information',
            contact: {
                name: 'Amazing Developer',
            },
            servers: ['http://localhost:3000'],
        },
    },
    apis: ['./routes/*js'],
};
app.use('/api', require('./routes/index'));

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(process.env.PORT, () => 'Server start');
