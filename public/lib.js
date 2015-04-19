function lib(window) {

    "use strict";

    function listJson() {
        list('application/json');
    }

    function listText() {
        list('text/plain');
    }

    function list(accept) {
        $.ajax({
            headers: {
                Accept: accept
            },
            url: 'http://localhost:3000/api/cows'
        }).done(function (cows, status, xhr) {
            if (xhr.responseJSON) {
                $('#list-results').html(JSON.stringify(xhr.responseJSON, undefined, 4));
            } else {
                $('#list-results').html(cows);
            }
        });
    }

    window.listJson = listJson;
    window.listText = listText;
}
