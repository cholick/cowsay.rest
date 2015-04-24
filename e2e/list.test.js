var Browser = require('zombie');

describe('GET /api/cows', function () {

    var browser = new Browser();

    before(function (done) {
        browser.visit('http://localhost:3000/', done);
    });

    it('click try', function () {
        browser.assert.style('#cancel-button-list', 'display', 'none');
        browser.assert.style('#try-list', 'display', 'none');

        return browser.pressButton('#try-button-list');
    });

    it('displays contents', function () {
        browser.assert.style('#cancel-button-list', 'display', '');
        browser.assert.style('#try-list', 'display', '');
    });

    it('text submit', function () {
        browser.assert.style('#results-header-list', 'display', 'none');
        browser.assert.text('#results-list', '');

        return browser.pressButton('#text-do-list');
    });

    it('shows text contents', function () {
        browser.assert.style('#results-header-list', 'display', '');
        //Fragile. Contains matcher?
        browser.assert.evaluate("$('#results-list').html().indexOf('bunny')", 15);
    });

    it('json submit', function () {
        return browser.pressButton('#json-do-list');
    });

    it('shows json contents', function () {
        //Fragile. Contains matcher?
        browser.assert.evaluate("$('#results-list').html().indexOf('\"cows\": [')", 6);
    });

});
