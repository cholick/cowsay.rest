function lib(window) {

    "use strict";

    function _getCleanInput(id) {
        return $('#' + id).val();
    }

    function _getSayUrl(action) {
        var cow = _getCleanInput('cow-' + action) || 'cow';
        var eyes = _getCleanInput('eyes-' + action);
        var tongue = _getCleanInput('tongue-' + action);

        var url = '/api/say/' + cow;
        if (eyes) {
            url = url + '/' + eyes;
            if (tongue) {
                url = url + '/' + tongue;
            }
        }
        return url
    }

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
        _list('application/json');
    }

    function listText() {
        _list('text/plain');
    }

    function _list(accept) {
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
        _get('application/json');
    }

    function getText() {
        _get('text/plain');
    }

    function _get(accept) {
        $('#results-header-get').show();
        $.ajax({
            headers: {
                Accept: accept
            },
            url: _getSayUrl('get')
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

    function postJson() {
        _post('application/json');
    }

    function postText() {
        _post('text/plain');
    }

    function _post(accept) {
        $('#results-header-post').show();
        var data = _getCleanInput('say-post') || 'Moo';
        $.ajax({
            headers: {
                Accept: accept
            },
            contentType: 'text/plain',
            method: 'POST',
            data: data,
            url: _getSayUrl('post')
        }).done(function (said, status, xhr) {
            if (xhr.responseJSON) {
                $('#results-post').html(JSON.stringify(xhr.responseJSON, undefined, 4));
            } else {
                $('#results-post').html(said);
            }
        }).error(function (jqXHR, textStatus, errorThrown) {
            $('#results-post').html(jqXHR.status + ": " + errorThrown);
        });
    }

    window.toggleTry = toggleTry;
    window.toggleCancel = toggleCancel;

    window.listJson = listJson;
    window.listText = listText;

    window.getJson = getJson;
    window.getText = getText;

    window.postJson = postJson;
    window.postText = postText;
}
