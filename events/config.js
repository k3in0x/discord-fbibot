// config.js
const express = require('express')
const server = express();
 
server.all('/', (req, res) => {
    res.send('Bot already ON.');
});

module.exports = () => {
    server.listen(3000, () => {
        console.log('Server ready.');
    });
    return true;
}