(function (travi) {
    'use strict';

    function renderDialogFromResponse(options) {
        var $dialog = $(options.html);

        $('body').append($dialog);
        $dialog.dialog({
            title: options.title
        });
    }

    function loadFromUrl(options) {
        $.ajax({
            url: options.url,
            dataType: 'html',
            type: 'get',
            success: function (html) {
                renderDialogFromResponse({
                    html: html,
                    title: options.title
                });
            }
        });
    }

    travi.register('ui.dialog.simple', {
        loadFromUrl: loadFromUrl
    });
}(travi));