(function (travi) {
    'use strict';

    function loadFromUrl(url) {
        $.ajax({
            url: url,
            dataType: 'html',
            type: 'get',
            success: function (html) {
                var $dialog = $(html);

                $('body').append($dialog);
                $dialog.dialog();
            }
        });
    }

    travi.register('ui.dialog.simple', {
        loadFromUrl: loadFromUrl
    });
}(travi));