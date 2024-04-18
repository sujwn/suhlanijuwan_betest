const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const dbConnect = require('./config/database');
dbConnect();
const helmet = require("helmet");
const clog = require("clog");
const { handleError, errorNotFound } = require("./utils/errorHandler");

app.use(morgan("short")); // HTTP request log
const corsOptions = {
    origin: true,
    credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));

// Pass variables to all requests
app.use((req, res, next) => {
    req.fullpath = req.path;
    next();
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet()); // Setting HTTP headers

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = NODE_ENV === 'development' ? process.env.NODE_LOCAL_PORT : process.env.NODE_DOCKER_PORT;

app.set(clog);
app.set('env', NODE_ENV); // Set app environment

// Pass variables to all requests
app.use((req, res, next) => {
    req.fullpath = req.path;
    next();
});

app.get("/", (req, res) => {
    const ipNotation = req.ip;
    const ipv4Address = ipNotation.split(':').pop();

    res.json({
        success: true,
        ip: ipv4Address
    });
});

app.use('/api', require('./routes'));

// Use custom error handler as middleware
app.use((err, req, res, next) => {
    handleError(err, req, res);
});

app.listen(PORT, () => {
    clog('server', `Server started on port ${PORT} in ${app.get('env')} mode`);
});

// Handle not found
app.use(function (req, res, next) {
    errorNotFound(req, res);
});

module.exports = app;