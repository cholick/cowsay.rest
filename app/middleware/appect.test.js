var chai = require('chai');
var sinon = require('sinon');

var assert = chai.assert;

var accept = require('./accept');

describe('middleware.accept', function () {
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
            headers: {},
            status: sinon.stub()
        };

        response = {};
        response.status = sinon.stub().returns(response);
        response.end = sinon.stub().returns(response);
    });

    it('is defined', function () {
        assert.isFunction(accept);
    });

    it('should allow text/plain', function () {
        request.headers['accept'] = 'text/plain';

        accept(request, response, nextCallback);

        assert.ok(nextWasCalled);
    });

    it('should allow text/*', function () {
        request.headers['accept'] = 'text/*';

        accept(request, response, nextCallback);

        assert.ok(nextWasCalled);
        assert.equal(request.headers['accept'], 'text/plain');
    });

    it('should allow any', function () {
        request.headers['accept'] = '*/*';

        accept(request, response, nextCallback);

        assert.ok(nextWasCalled);
        assert.equal(request.headers['accept'], 'text/plain');
    });

    it('should accept complex accept types', function () {
        request.headers['accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8';

        accept(request, response, nextCallback);

        assert.ok(nextWasCalled);
        assert.equal(request.headers['accept'], 'text/plain');
    });

    it('should allow application/json', function () {
        request.headers['accept'] = 'application/json';

        accept(request, response, nextCallback);

        assert.ok(nextWasCalled);
    });

    it('should allow application/*', function () {
        request.headers['accept'] = 'application/json';

        accept(request, response, nextCallback);

        assert.ok(nextWasCalled);
        assert.equal(request.headers['accept'], 'application/json');
    });

    it('should return 406 on invalid type', function () {
        request.headers['accept'] = 'foo';

        accept(request, response, nextCallback);

        assert.notOk(nextWasCalled);

        assert.ok(response.status.calledWith(406), 'status not called with 406');
        assert.ok(response.end.called, 'end not called');
    });
});
