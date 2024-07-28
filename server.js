require('./envloader')();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const { respond, l } = require('./loader.js').helpers;
const baseRouter = require('./router.js');
const { loadDependency } = require('./loader.js');
const pgLite = require('pg-lite');

const app = express();
const port = process.env.PORT || 3001;

// Initialize pg-lite
const db = new pgLite.Client({
    database: 'mydb', // replace with your database name
    user: 'myuser', // replace with your database user
    password: 'mypassword', // replace with your database password
    port: 5432, // default PostgreSQL port
});

db.connect(err => {
    if (err) {
        console.error('Failed to connect to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

// Middleware setup
loadDependency(app);

app.use(express.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return respond(res, 400, { message: 'Invalid JSON found' });
    }
    next();
});

app.use(
    morgan(
        'REQUEST [:date[clf]] ":method :url HTTP/:http-version" :status :user-agent',
        {
            immediate: true,
            skip: function (req) { return req.path === '/api/'; },
        },
    ),
);

app.use(
    express.urlencoded({
        extended: true,
        limit: '2mb',
        parameterLimit: 1000000,
    }),
);

app.use(compression());
app.use(helmet());
app.use(cors());

app.use('/api/', baseRouter);

app.get('/', (req, res) => {
    return res.send('Compiler is up and working');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
