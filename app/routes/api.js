var cowsay = require('cowsay');
var _ = require('lodash');

var cows = require('../lib/cows');

function list(req, res) {
    if (acceptsJson(req)) {
        res.json({cows: cows});
    } else {
        sendText(res, cows.join('\n'));
    }
    res.end('\n');
}

function say(req, res) {
    var say;
    if (sentJson(req)) {
        if (sentValidJson(req)) {
            say = req.body.say;
        } else {
            res.status(422).end();
            return;
        }
    } else {
        say = req.body;
    }

    doSay(req, res, say);
}

function sayDefault(req, res) {
    doSay(req, res, 'Moo');
}

function doSay(req, res, message) {
    var cow = req.params.cow || 'default';
    cow = cow.toLocaleLowerCase();
    if (cow == 'cow') {
        cow = 'default';
    }

    if (_.contains(cows, cow)) {
        var cowSaid = cowsay.say({
            text: message,
            f: cow,
            e: req.params.eyes,
            T: req.params.tongue
        });

        if (acceptsJson(req)) {
            res.json({cowSaid: cowSaid});
        } else {
            sendText(res, cowSaid);
        }
        res.end('\n');
    } else {
        res.status(404).end();
    }
}

function sendText(res, body) {
    res.set({'Content-type': 'text/plain'});
    res.write(body);
}

function sentValidJson(req) {
    return req.body.say && typeof req.body.say == 'string';
}

function sentJson(req) {
    return req.headers['content-type'] === 'application/json';
}

function acceptsJson(req) {
    return req.headers['accept'] === 'application/json';
}

module.exports = {
    list: list,
    say: say,
    sayDefault: sayDefault
};
