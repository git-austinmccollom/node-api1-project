//initialize
const express = require('express');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ hello: 'world' })
})

// data

const users = [

]

// endpoints



//footer

const port = 5000;
server.listen(port, () => console.log('server running...'));