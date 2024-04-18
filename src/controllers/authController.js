const { generateToken } = require('../utils/jwtUtils');
const User = require('../models/user');

// POST route to login with userName and accountNumber
exports.login = async (req, res, next) => {
    const { userName, accountNumber } = req.body;

    try {
        // Validate user credentials
        const user = await User.findOne({ userName, accountNumber });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken({ userName: user.userName, accountNumber: user.accountNumber });
        res.json({ token });
    } catch (err) {
        next(err);
    }
}
