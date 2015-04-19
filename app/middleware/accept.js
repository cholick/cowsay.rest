var _ = require('lodash');

var validAcceptTypes = [
    ['text/plain', 'text/plain'],
    ['text/*', 'text/plain'],
    ['*/*', 'text/plain'],
    ['application/json', 'application/json'],
    ['application/*', 'application/json']
];

function checkAccept(request, response, next) {
    var rawAccept = request.headers['accept'];
    var parsedAccept = rawAccept.split(',').map(function (acceptValue) {
        return acceptValue.split(';')[0].trim();
    });

    var index;
    for (index = 0; index < validAcceptTypes.length; ++index) {
        var acceptable = validAcceptTypes[index];
        if (_.contains(parsedAccept, acceptable[0])) {
            request.headers['accept'] = acceptable[1];
            next();
            return;
        }
    }

    response.status(406).end();
}

module.exports = checkAccept;
