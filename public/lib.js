function lib(window) {

    "use strict";

    function toggleTry(action) {
        $('#try-' + action).fadeIn(200);
        $('#try-button-' + action).hide();
        $('#cancel-button-' + action).show();
    }

    function toggleCancel(action) {
        $('#try-' + action).fadeOut(200);
        $('#try-button-' + action).show();
        $('#cancel-button-' + action).hide();
    }

    function listJson() {
        list('application/json');
    }

    function listText() {
        list('text/plain');
    }

    function list(accept) {
        $('#results-header-list').show();
        $.ajax({
            headers: {
                Accept: accept
            },
            url: '/api/cows'
        }).done(function (cows, status, xhr) {
            if (xhr.responseJSON) {
                $('#results-list').html(JSON.stringify(xhr.responseJSON, undefined, 4));
            } else {
                $('#results-list').html(cows);
            }
        }).error(function (jqXHR, textStatus, errorThrown) {
            $('#results-list').html(jqXHR.status + ": " + errorThrown);
        });
    }

    function getJson() {
        get('application/json');
    }

    function getText() {
        get('text/plain');
    }

    function getCleanInput(id) {
        return $('#' + id).val();
    }

    function getSayUrl() {
        var cow = getCleanInput('get-cow') || 'cow';
        var eyes = getCleanInput('get-eyes');
        var tongue = getCleanInput('get-tongue');

        var url = '/api/say/' + cow;
        if (eyes) {
            url = url + '/' + eyes;
            if (tongue) {
                url = url + '/' + tongue;
            }
        }
        return url
    }

    function get(accept) {
        $('#results-header-get').show();
        $.ajax({
            headers: {
                Accept: accept
            },
            url: getSayUrl()
        }).done(function (said, status, xhr) {
            if (xhr.responseJSON) {
                $('#results-get').html(JSON.stringify(xhr.responseJSON, undefined, 4));
            } else {
                $('#results-get').html(said);
            }
        }).error(function (jqXHR, textStatus, errorThrown) {
            $('#results-get').html(jqXHR.status + ": " + errorThrown);
        });
    }

    window.toggleTry = toggleTry;
    window.toggleCancel = toggleCancel;

    window.listJson = listJson;
    window.listText = listText;

    window.getJson = getJson;
    window.getText = getText;
}
