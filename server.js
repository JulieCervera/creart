const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const cors = require('cors');
const fileUpload = require('express-fileupload');

const api = require('./routes/api');
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/api',api);
app.use('/public',express.static('./public'));
app.use(fileUpload());


app.get('/', function(req, res){
    res.send('Hello from server')
})

app.listen(PORT, function(req, res){
    console.log('Server running on localhost:'+ PORT);
})