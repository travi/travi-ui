(function (travi) {
    'use strict';

    var events = travi.events,
        dialogEvents = travi.ui.dialog.events,

        $dialog;

    function renderDialogFromResponse(options) {
        $dialog = $(options.html);

        $('body').append($dialog);
        $dialog.dialog({
            title: options.title,
            modal: true,
            close: function () {
                $(this).dialog('destroy').remove();
            }
        });
    }

    function loadFromUrl(options) {
        $.ajax({
            url: options.url,
            dataType: 'html',
            type: 'get',
            success: function (html) {
                renderDialogFromResponse({
                    html: html,
                    title: options.title
                });
                events.publish(dialogEvents.keys.LOADED, {
                    $dialog: $dialog.get(0)
                });
            }
        });
    }

    travi.register('ui.dialog.simple', {
        loadFromUrl: loadFromUrl
    });
}(travi));