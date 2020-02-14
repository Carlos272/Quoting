var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config()

//DB CONNECTION
mongoose.connect(process.env.DB_LOCAL, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)

app.use(cors());

var port = process.env.PORT || 8082;


var auth = require('./app/routes/v1/auth/auth');
var user = require('./app/routes/v1/User/User');


//MORGAN PARA MOSTRAR EN LA CONSOLA TODAS LAS PETICIONES HECHAS AL SERVIDOR
app.use(morgan('dev'));

app.use(bodyParser.json());

//parse application/vnd.api+json as json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

//v1 APIs
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);

//Authentication required APIs
app.listen(8082);
console.log('Magic happens at http://localhost:' + port);