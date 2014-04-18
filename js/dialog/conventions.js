(function (travi) {
    'use strict';

    travi.register('ui.dialog.conventions', {
        init: function () {
            $('a.dialog-target').click(function () {
                travi.ui.dialog.simple.loadFromUrl($(this).attr('href'));
            });
        }
    });
}(travi));