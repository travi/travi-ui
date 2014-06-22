(function (travi) {
    'use strict';

    function init() {
        $('input[type=submit]').addClass('ui-button');
    }

    travi.register('ui.form.buttons', {
        init: init
    });
}(travi));