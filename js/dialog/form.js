(function (travi) {
    'use strict';

    var events = travi.events,
        dialog = travi.ui.dialog.simple,
        dialogEvents = travi.ui.dialog.events,
        validationMapper = travi.ui.form.validationMapper;

    function getValidationErrorsFrom(xhr) {
        return JSON.parse(xhr.responseText).form.errors;
    }

    function handleFormSubmission(e) {
        var $form = $(this);
        e.preventDefault();

        /*jslint unparam: true */
        $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method') || 'get',
            dataType: 'json',
            data: $form.serialize(),
            statusCode: {
                201: function (data, status, xhr) {
                    $.ajax({
                        url: xhr.getResponseHeader('Location'),
                        success: function (html) {
                            $('ol.entityList').append(html);
                        }
                    });
                },
                400: function (xhr) {
                    validationMapper.showErrors($form.get(0), getValidationErrorsFrom(xhr));
                }
            },
            success: function () {
                dialog.close();
            }
        });
        /*jslint unparam: false */
    }

    function enhanceForm(data) {
        $(data.dialog).find('form').submit(handleFormSubmission);
    }

    function init() {
        events.subscribe(dialogEvents.keys.LOADED, enhanceForm);
    }

    travi.register('ui.dialog.form', {
        init: init
    });
}(travi));