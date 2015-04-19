var _ = require('lodash');

var validContentTypes = [
    'text/plain',
    'application/json'
];

function checkType(request, response, next) {
    contentType = request.headers['content-type'];
    method = request.headers['method'];
    if (method !== 'POST' || _.contains(validContentTypes, contentType)) {
        next();
    } else {
        response.status(415).end();
    }
}

module.exports = checkType;
