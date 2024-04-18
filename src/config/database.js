const mongoose = require('mongoose');

const MONGODB_URI = process.env.NODE_ENV === 'development' ? process.env.MONGODB_LOCAL_URI : process.env.MONGODB_DOCKER_URI;

const dbconnect = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(`${MONGODB_URI}/${process.env.MONGODB_NAME}`, {
    }).then(con => {
        console.log(`Connected to MongoDB database with host: ${con.connection.host}`);
    });
};

module.exports = dbconnect;