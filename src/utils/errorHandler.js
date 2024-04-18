const clog = require('clog');
const RESPONSE_CODE = require('./responseCode');

class ErrorHandler extends Error {
    constructor(type, message, error) {
        if (!message) message = RESPONSE_CODE[type].message;
        super(message);
        this.statusCode = RESPONSE_CODE[type].code;
        this.name = RESPONSE_CODE[type].name;
        this.error = error;
        Error.captureStackTrace(this, this.constructor);
    }
}

const errorNotFound = (req, res) => {
    const err = RESPONSE_CODE['NOT_FOUND'];
    clog.error(err.code, err.message)
    res.status(404).json({
        success: false,
        source: req.path,
        error: err
    });
}

const handleError = (err, req, res) => {
    err.statusCode = err.statusCode || 500;
    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        err.statusCode = 400;
        err.name = "VALIDATION_ERROR";
        let msg = [];
        err.errors.forEach((error) => {
            msg.push(error.message);
        });
        err.message = msg.join(', ');
    } else if (err.name === "SequelizeDatabaseError") {
        err.statusCode = 400;
        err.name = "PARAM_ERROR";
    } else if (err.name === "PrismaClientValidationError") {
        err.statusCode = 500;
        err.name = "VALIDATION_ERROR";
    } else if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.name = "VALIDATION_ERROR";
        let msg = [];
        Object.keys(err.errors).forEach((key) => {
            msg.push(err.errors[key].message);
        });
        err.message = msg.join(' | ');
    } else if (err.name === 'MongoServerError' && err.code === 11000) {
        const keyValueKey = Object.keys(err.keyValue)[0];
        err.statusCode = 409;
        err.name = "VALIDATION_ERROR";
        err.message = `${keyValueKey} is already in use`
    } else if (err.name === 'CastError') {
        err.statusCode = 400;
        err.name = "BAD_REQUEST";
        err.message = `Invalid ${err.path}: ${err.value}`;
    }

    let er = { statusCode: err.statusCode, name: err.name, message: err.message, error: err.error };
    if (process.env.NODE_ENV === 'development') {
        clog.error(err.statusCode, err);
        res.status(err.statusCode).json({
            success: false,
            origin: req.path,
            message: err.message,
            error: er,
            stack: err.stack
        });
    }

    if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
        if (err.statusCode > 499) {
            clog.error(err.statusCode, err);
            er = RESPONSE_CODE['INTERNAL_SERVER_ERROR'];
        }

        res.status(err.statusCode).json({
            success: false,
            origin: req.path,
            message: err.message,
            error: er
        });
    }
}

module.exports = { ErrorHandler, handleError, errorNotFound }