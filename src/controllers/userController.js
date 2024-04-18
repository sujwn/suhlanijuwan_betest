const User = require('../models/user');
const { cacheUserData, getCachedUserData } = require('../utils/redisUtils');
const { ErrorHandler } = require("../utils/errorHandler");

// GET all users
exports.getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const users = await User.find().skip(skip).limit(limit).sort({ _id: -1 });

        const totalUsers = await User.countDocuments();

        res.json({
            data: users,
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers
        });
    } catch (err) {
        next(err);
    }
};


// GET user by accountNumber
exports.getByAccountNumber = async (req, res, next) => {
    const accountNumber = req.params.accountNumber;
    try {
        const cachedUser = await getCachedUserData(`user:${accountNumber}`);
        if (cachedUser) {
            res.json(cachedUser);
        } else {
            const user = await User.findOne({ accountNumber });
            if (user) {
                cacheUserData(`user:${accountNumber}`, user);
                res.json(user);
            } else {
                throw new ErrorHandler('USER_NOT_FOUND');
            }
        }
    } catch (err) {
        next(err);
    }
}

// GET user by identityNumber
exports.getByIdentityNumber = async (req, res, next) => {
    const identityNumber = req.params.identityNumber;
    try {
        const cachedUser = await getCachedUserData(`user:${identityNumber}`);
        if (cachedUser) {
            res.json(cachedUser);
        } else {
            const user = await User.findOne({ identityNumber });
            if (user) {
                cacheUserData(`user:${identityNumber}`, user);
                res.json(user);
            } else {
                throw new ErrorHandler('USER_NOT_FOUND');
            }
        }
    } catch (err) {
        next(err);
    }
}

// POST new user
exports.create = async (req, res, next) => {
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
}

// PATCH update existing user
exports.update = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            throw new ErrorHandler('USER_NOT_FOUND');
        }
        cacheUserData(`user:${updatedUser.accountNumber}`, updatedUser);
        res.json(updatedUser);
    } catch (err) {
        next(err);
    }
}


// DELETE user
exports.delete = async (req, res, next) => {
    const id = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new ErrorHandler('USER_NOT_FOUND');
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        next(err);
    }
}