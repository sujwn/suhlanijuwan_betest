require("dotenv").config();
const mongoose = require('mongoose');
const User = require('./models/user');

// MongoDB connection URL
const MONGODB_URI = process.env.NODE_ENV === 'development' ? process.env.MONGODB_LOCAL_URI : process.env.MONGODB_DOCKER_URI;

// Connect to the MongoDB database
mongoose.connect(`${MONGODB_URI}/${process.env.MONGODB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Sample default user data
const defaultUser = {
    userName: 'admin',
    accountNumber: '00000000000',
    emailAddress: 'admin@example.com',
    identityNumber: '1234567890123'
};

// Function to seed data
async function seedData() {
    try {
        // Check if the default user already exists
        const existingUser = await User.findOne({ userName: defaultUser.userName });
        if (existingUser) {
            console.log('Default user already exists');
            return;
        }

        // Insert the sample data
        await User.create(defaultUser);

        console.log('Data seeded successfully.');
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
}

// Call the seedData function to populate the database
seedData();
