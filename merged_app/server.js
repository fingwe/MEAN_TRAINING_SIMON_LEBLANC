const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const SwaggerExpress = require('swagger-express-mw');

const config = {
    appRoot: __dirname, // required config
  };


//get api routes
const api = require('./api/routes/apiRouter');

const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

SwaggerExpress.create(config, (err, SwaggerExpress) => {
    if (err) { throw err;}

    SwaggerExpress.register(app);

    let port = 10010;
    console.log('Swagger listenning on port: 10010');

    app.listen(port);
})

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
