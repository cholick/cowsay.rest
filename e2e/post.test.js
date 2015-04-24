var Browser = require('zombie');

describe('POST /api/say', function () {

    var browser = new Browser();

    before(function (done) {
        browser.visit('http://localhost:3000/', done);
    });

    it('click try', function () {
        browser.assert.style('#cancel-button-post', 'display', 'none');
        browser.assert.style('#try-post', 'display', 'none');

        return browser.pressButton('#try-button-post');
    });

    it('displays contents', function () {
        browser.assert.style('#cancel-button-post', 'display', '');
        browser.assert.style('#try-post', 'display', '');
    });

    it('fills in values', function () {
        browser.fill('#say-post', 'Woof');
    });

    it('submits text', function () {
        browser.assert.style('#results-header-post', 'display', 'none');
        browser.assert.text('#results-post', '');

        return browser.pressButton('#text-do-post');
    });

    it('shows text contents', function () {
        browser.assert.style('#results-header-post', 'display', '');
        //Fragile. Contains matcher?
        browser.assert.evaluate("$('#results-post').html().indexOf('Woof')", 13);
    });
});
