(function (travi) {
    'use strict';

    function enhanceLinkIntoDialog(e) {
        var $link = $(e.target);
        e.preventDefault();

        travi.ui.dialog.simple.loadFromUrl({
            url: $link.attr('href'),
            title: $link.text()
        });
    }

    function init() {
        $('body').on('click', 'a.dialog-target', enhanceLinkIntoDialog);
    }

    travi.register('ui.dialog.conventions', {
        init: init
    });
}(travi));