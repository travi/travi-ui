(function (travi) {
    'use strict';

    function loadFromUrl(url) {
        $.ajax({
            url: url,
            dataType: 'html',
            type: 'get'
        });
    }

    travi.register('ui.dialog.simple', {
        loadFromUrl: loadFromUrl
    });
}(travi));