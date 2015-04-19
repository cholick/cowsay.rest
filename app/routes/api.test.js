var chai = require('chai');
var sinon = require('sinon');
var _ = require('lodash');
var proxyquire = require('proxyquire');

var assert = chai.assert;

var api = require('./api');

describe('route.api', function () {
    var request;
    var response;
    var sayStub = sinon.stub().returns('Moo');

    beforeEach(function () {
        api = proxyquire('./api', {
            cowsay: {
                say: sayStub
            }
        });
        sayStub.reset();

        request = {
            headers: {
                'accept': 'text/plain'
            },
            params: {},
            status: sinon.stub()
        };

        response = {};
        response.status = sinon.stub().returns(response);
        response.set = sinon.stub().returns(response);
        response.writeHead = sinon.stub().returns(response);
        response.write = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        response.end = sinon.stub().returns(response);
    });

    afterEach(function () {
        assert.equal(response.end.callCount, 1);
    });

    describe('list', function () {

        describe('text', function () {
            it('sends back text', function () {
                api.list(request, response);

                assert.deepEqual(response.set.args[0][0], {'Content-type': 'text/plain'});
            });

            it('list contains cows', function () {
                api.list(request, response);

                var body = response.write.args[0][0];

                assert.notEqual(body.indexOf('cow'), -1);
                assert.notEqual(body.indexOf('default'), -1);
                assert.notEqual(body.indexOf('dragon'), -1);
                assert.notEqual(body.indexOf('kitty'), -1);
            });
        });

        describe('json', function () {
            beforeEach(function () {
                request.headers['accept'] = 'application/json';
            });

            it('sends back json', function () {

                api.list(request, response);

                assert.ok(response.json.called);
            });


            it('json list contains cows', function () {
                api.list(request, response);

                var jsonBody = response.json.args[0][0];

                assert.ok(jsonBody.cows);
                assert.ok(_.contains(jsonBody.cows, 'cow'));
                assert.ok(_.contains(jsonBody.cows, 'default'));
                assert.ok(_.contains(jsonBody.cows, 'dragon'));
                assert.ok(_.contains(jsonBody.cows, 'kitty'));
            });
        });
    });

    describe('say default', function () {
        it('says moo', function () {
            api.sayDefault(request, response);
            assert.equal(sayStub.args[0][0].text, 'Moo');
        });

        it('uses provided cow', function () {
            request.params.cow = 'dragon';
            api.sayDefault(request, response);

            assert.equal(sayStub.args[0][0].f, 'dragon');
        });

        it('404 on unknown cow', function () {
            request.params.cow = 'doge';
            api.sayDefault(request, response);

            assert.equal(response.status.args[0][0], 404);
        });

        it('translates "cow" to "default"', function () {
            request.params.cow = 'cow';
            api.sayDefault(request, response);

            assert.equal(sayStub.args[0][0].f, 'default');
        });

        it('uses provided eyes', function () {
            request.params.eyes = '--';
            api.sayDefault(request, response);

            assert.equal(sayStub.args[0][0].e, '--');
        });

        it('uses provided tongue', function () {
            request.params.tongue = 'U';
            api.sayDefault(request, response);

            assert.equal(sayStub.args[0][0].T, 'U');
        });

        describe('text', function () {
            it('sends back text', function () {
                api.sayDefault(request, response);

                assert.deepEqual(response.set.args[0][0], {'Content-type': 'text/plain'});
            });

            it('writes out what cow said ', function () {
                api.sayDefault(request, response);

                assert.equal(response.write.args[0][0], 'Moo');
            });
        });

        describe('json', function () {
            beforeEach(function () {
                request.headers['accept'] = 'application/json';
            });

            it('sends back json', function () {
                api.sayDefault(request, response);

                assert.ok(response.json.called);
            });

            it('returns json say', function () {
                api.sayDefault(request, response);

                assert.deepEqual(response.json.args[0][0], {cowSaid: 'Moo'});
            });
        });
    });

    describe('say', function () {
        it('passes body to cow', function () {
            request.body = 'Moo moo';
            api.say(request, response);

            assert.equal(sayStub.args[0][0].text, 'Moo moo');
        });

        it('passes json to cow', function() {
            request.headers['content-type'] = 'application/json';
            request.body = {
                say: 'Meow'
            };

            api.say(request, response);

            assert.equal(sayStub.args[0][0].text, 'Meow');
        });

        it('sends 422 on body without say', function() {
            request.headers['content-type'] = 'application/json';
            request.body = {
                foo: true
            };

            api.say(request, response);

            assert.equal(response.status.args[0][0], 422);
        });

        it('sends 422 on invalid say', function() {
            request.headers['content-type'] = 'application/json';
            request.body = {
                say: {
                    moo: 3
                }
            };

            api.say(request, response);

            assert.equal(response.status.args[0][0], 422);
        });
    });
});
