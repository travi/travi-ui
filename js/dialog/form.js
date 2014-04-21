(function (travi) {
    'use strict';

    var events = travi.events,
        dialog = travi.ui.dialog.simple,
        dialogEvents = travi.ui.dialog.events;

    function handleFormSubmission(e) {
        var $form = $(this);
        e.preventDefault();

        $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method') || 'get',
            success: function () {
                dialog.close();
            },
            statusCode: {
                400: function () {}
            }
        });
    }

    function enhanceForm(data) {
        data.$dialog.find('form').submit(handleFormSubmission);
    }

    function init() {
        events.subscribe(dialogEvents.keys.LOADED, enhanceForm);
    }

    travi.register('ui.dialog.form', {
        init: init
    });
}(travi));