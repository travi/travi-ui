(function (travi) {
    'use strict';

    travi.register('ui.dialog.conventions', {
        init: function () {
            $('a').click(function () {
                travi.ui.dialog.simple.loadFromUrl();
            });
        }
    });
}(travi));