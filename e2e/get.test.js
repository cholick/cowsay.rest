var Browser = require('zombie');

describe('GET /api/say', function () {

    var browser = new Browser();

    before(function (done) {
        browser.visit('http://localhost:3000/', done);
    });

    it('click try', function () {
        browser.assert.style('#cancel-button-get', 'display', 'none');
        browser.assert.style('#try-get', 'display', 'none');

        return browser.pressButton('#try-button-get');
    });

    it('displays contents', function () {
        browser.assert.style('#cancel-button-get', 'display', '');
        browser.assert.style('#try-get', 'display', '');
    });

    it('fills in values', function () {
        browser.fill('#get-cow', 'cow');
        browser.fill('#get-eyes', 'xx');
        browser.fill('#get-tongue', ' U');
    });

    it('submits text', function () {
        browser.assert.style('#results-header-get', 'display', 'none');
        browser.assert.text('#results-get', '');

        return browser.pressButton('#text-do-get');
    });

    it('shows text contents', function () {
        browser.assert.style('#results-header-get', 'display', '');
        //Fragile. Contains matcher?
        browser.assert.evaluate("$('#results-get').html().indexOf('Moo')", 12);
    });
});
