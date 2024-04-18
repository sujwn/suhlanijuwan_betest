const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

function loadRoutes(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        const isDirectory = fs.statSync(fullPath).isDirectory();

        if (isDirectory) {
            loadRoutes(fullPath); // Recursively load routes in subdirectories
        } else if (file.slice(-3) === '.js' && file !== 'index.js') {
            const routePath = path.relative(__dirname, fullPath).slice(0, -3).replace(/\\/g, '/');
            router.use(`/${routePath}`, require(`./${routePath}`));
        }
    });
}

loadRoutes(__dirname);

router.get('/', (req, res) => {
    const ipNotation = req.ip;
    const ipv4Address = ipNotation.split(':').pop();

    res.json({
        success: true,
        origin: req.path,
        ip: ipv4Address,
        timestamp: req.timestamp,
    });
});

module.exports = router;
