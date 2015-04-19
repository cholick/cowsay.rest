var express = require('express');

var app = express();

app.use('/api',
    require('./app/middleware/content-type'),
    require('./app/middleware/accept'),
    require('./app/routes/api-routes')
);

app.use('/', express.static('public'));

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server started on [' + port + ']');
});
