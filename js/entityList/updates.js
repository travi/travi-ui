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

    function addResourceToList(resource) {
        requestResourceAndThen(resource, function (html) {
            $('ol.entityList').append(html);
        });
    }

    function removeResourceFromList(resource) {
        $('li.entityBlock[travi-self="' + resource + '"]').remove();
    }

    function updateResourceInList(resource) {
        requestResourceAndThen(resource, function (html) {
            $('li.entityBlock[travi-self="' + resource + '"]').replaceWith(html);
        });
    }

    function init() {
        dialogEvents.form({
            created: function (eventData) {
                addResourceToList(eventData.resource);
            },
            success: function (eventData) {
                if ('remove-resource' === eventData.key) {
                    removeResourceFromList(eventData.resource);
                } else {
                    updateResourceInList(eventData.resource);
                }
            }
        });
    }

    travi.register('ui.entityList.updates', {
        init: init
    });
}(travi));