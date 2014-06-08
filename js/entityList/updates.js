(function (travi) {
    'use strict';

    var dialogEvents = travi.ui.dialog.events;

    function requestResourceAndThen(resource, callback) {
        $.ajax({
            url: resource,
            type: 'get',
            dataType: 'html',
            success: callback
        });
    }

    function init() {
        dialogEvents.form({
            created: function (eventData) {
                requestResourceAndThen(eventData.resource, function (html) {
                    $('ol.entityList').append(html);
                });
            },
            success: function (eventData) {
                requestResourceAndThen(eventData.resource, function (html) {
                    $('li.entityBlock[travi-self="' + eventData.resource + '"]').replaceWith(html);
                });
            }
        });
    }

    travi.register('ui.entityList.updates', {
        init: init
    });
}(travi));