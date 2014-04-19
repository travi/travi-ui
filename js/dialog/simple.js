(function (travi) {
    'use strict';

    function renderDialogFromResponse(html) {
        var $dialog = $(html);

        $('body').append($dialog);
        $dialog.dialog();
    }

    function loadFromUrl(options) {
        $.ajax({
            url: options.url,
            dataType: 'html',
            type: 'get',
            success: renderDialogFromResponse
        });
    }

    travi.register('ui.dialog.simple', {
        loadFromUrl: loadFromUrl
    });
}(travi));