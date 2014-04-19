(function (travi) {
    'use strict';

    travi.register('ui.dialog.conventions', {
        init: function () {
            $('body').on('click', 'a.dialog-target', function (e) {
                e.preventDefault();
                travi.ui.dialog.simple.loadFromUrl({
                    url: $(this).attr('href')
                });
            });
        }
    });
}(travi));