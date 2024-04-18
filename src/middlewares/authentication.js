const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ErrorHandler } = require('../utils/errorHandler');

const decodeToken = (req) => {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ')[1];
        try {
            const decodedToken = jwt.verify(bearer, process.env.JWT_SECRET_KEY);

            return decodedToken;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return 'TOKEN_EXPIRED';
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
}

exports.authenticateToken = async (req, res, next) => {
    const decodedToken = decodeToken(req);
    
    try {
        if (decodedToken) {
            if (decodedToken === 'TOKEN_EXPIRED') throw new ErrorHandler('TOKEN_EXPIRED');

            const user = await User.findOne({ userName: decodedToken.userName });

            if (!user) throw new ErrorHandler('UNAUTHORIZED');
            req.user = user;
            req.iat = decodedToken.iat;
            next();
        } else {
            throw new ErrorHandler('TOKEN_INVALID');
        }
    } catch (error) {
        next(error);
    }
}