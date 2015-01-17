(function (travi) {
    'use strict';

    function placeMessage($error, $element) {
        var $parents = $element.parents('.choices');

        if (0 < $parents.length) {
            $parents.after($error);
        } else {
            $element.after($error);
        }
    }

    function init() {
        $('form').validate({
            errorClass: 'ui-state-error',
            errorPlacement: placeMessage
        });
    }

    travi.register('ui.form.validation.active', {
        init: init
    });
}(travi));