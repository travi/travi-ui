(function (travi) {
    'use strict';

    function init() {
        $('form').validate({
            errorClass: 'ui-state-error'
        });
    }

    travi.register('ui.form.validation.active', {
        init: init
    });
}(travi));