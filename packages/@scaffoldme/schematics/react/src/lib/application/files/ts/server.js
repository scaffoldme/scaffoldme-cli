const express = require('express');
const path = require('path');
const cors = require('cors');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App setup
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors());
app.use(express.static(path.resolve('./dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve('./dist/index.html'))
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

http.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});

