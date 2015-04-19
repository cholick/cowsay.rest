var chai = require('chai');
var sinon = require('sinon');

var assert = chai.assert;

var contentType = require('./content-type');

describe('middleware.content-type', function () {
    var nextWasCalled;
    var nextCallback;
    var request;
    var response;

    beforeEach(function () {
        nextWasCalled = false;
        nextCallback = function () {
            nextWasCalled = true;
        };

        request = {
            headers: {
                'method': 'POST'
            },
            status: sinon.stub()
        };

        response = {};
        response.status = sinon.stub().returns(response);
        response.end = sinon.stub().returns(response);
    });

    it('is defined', function () {
        assert.isFunction(contentType);
    });

    it('should accept text/plain', function () {
        request.headers['content-type'] = 'text/plain';

        contentType(request, response, nextCallback);

        assert.ok(nextWasCalled);
    });

    it('should accept application/json', function () {
        request.headers['content-type'] = 'application/json';

        contentType(request, response, nextCallback);

        assert.ok(nextWasCalled);
    });

    it('should only care about POST', function () {
        request.headers['content-type'] = 'foo';
        request.headers['method'] = 'GET';

        contentType(request, response, nextCallback);

        assert.ok(nextWasCalled);
    });

    it('should return 415 on invalid type', function () {
        request.headers['content-type'] = 'foo';

        contentType(request, response, nextCallback);

        assert.notOk(nextWasCalled);

        assert.ok(response.status.calledWith(415), 'status not called with 415');
        assert.ok(response.end.called, 'end not called');
    });
});
