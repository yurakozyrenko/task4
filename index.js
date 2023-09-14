const express = require('express');
const app = express();
const { connectToDb, getDb } = require('./db');

const Sentry = require('@sentry/node');

require('dotenv').config();

app.use(express.json());
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

Sentry.init({
    dsn: process.env.DSN,
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({
            tracing: true,
        }),
        // enable Express.js middleware tracing
        new Sentry.Integrations.Express({
            app,
        }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

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
let db;
connectToDb((err) => {
    if (!err) {
        app.listen(process.env.PORT, (err) => {
            err ? console.log(err) : console.log(`Server start`);
        });
        db = getDb();
    } else {
        console.log(`DB connection error ${err}`);
    }
});
