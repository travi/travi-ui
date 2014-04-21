(function (travi) {
    'use strict';

    var events = travi.events,
        dialogEvents = travi.ui.dialog.events;

    function handleFormSubmission(e) {
        var $form = $(this);
        e.preventDefault();

        $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method') || 'get'
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