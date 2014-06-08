(function (travi) {
    'use strict';

    var dialogEvents = travi.ui.dialog.events;

    function init() {
        dialogEvents.form({
            success: function (eventData) {
                $.ajax({
                    url: eventData.resource,
                    type: 'get',
                    dataType: 'html',
                    success: function (html) {
                        $('li.entityBlock[travi-self="' + eventData.resource + '"]').replaceWith(html);
                    }
                });
            }
        });
    }

    travi.register('ui.entityList.updates', {
        init: init
    });
}(travi));