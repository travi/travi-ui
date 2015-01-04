(function (travi) {
    'use strict';

    function init() {
        $('form').validate();
    }

    travi.register('ui.form.validation.active', {
        init: init
    });
}(travi));