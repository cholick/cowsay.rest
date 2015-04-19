var express = require('express');
var bodyParser = require('body-parser');

var api = require('./api');

var jsonParser = bodyParser.json();
var textParser = bodyParser.text();

var router = express.Router();

router.get('/say/:cow?/:eyes?/:tongue?', api.sayDefault);
router.post('/say/:cow?/:eyes?/:tongue?', textParser, jsonParser, api.say);
router.get('/cows', api.list);

module.exports = router;
