const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');



//get api routes
const api = require('./server/routes/apiRouter');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'dist/frontend')));

app.use('/static', express.static('static'));

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/frontend/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`API running on localhost:${port}`);
    console.log(`Started listenning at: ${new Date()}`);
});
