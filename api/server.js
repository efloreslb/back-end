const express = require('express');
const server = express();

server.get('/', (req, res) => {
    res.send('I am alive!!')
})


module.exports = server;