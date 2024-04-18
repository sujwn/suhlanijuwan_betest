const { ErrorHandler } = require('../utils/errorHandler');
const { validationResult } = require('express-validator');

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let e = [];
        for (const err of errors.array()) {
            e.push({
                key: err.path,
                msg: err.msg
            });
        }

        const messageStrings = e.map(obj => obj.msg);
        const messagesCombined = messageStrings.join(' | ');

        throw new ErrorHandler('VALIDATION_ERROR', messagesCombined, e)
    }
    next();
}