const Redis = require('ioredis');

const redisUrl = process.env.NODE_ENV === 'development' ? process.env.REDIS_LOCAL_URL : process.env.REDIS_DOCKER_URL;

const client = new Redis(redisUrl);

function cacheUserData(key, userData) {
    client.setex(key, 3600, JSON.stringify(userData));
}

function getCachedUserData(key) {
    return new Promise((resolve, reject) => {
        client.get(key, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
}


module.exports = {
    cacheUserData,
    getCachedUserData
};
