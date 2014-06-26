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

    function wasRemove(key) {
        return 'remove-resource' === key;
    }

    function wasEdit(key) {
        return 'edit-resource' === key;
    }

    function init() {
        dialogEvents.form({
            created: function (eventData) {
                addResourceToList(eventData.resource);
            },
            success: function (eventData) {
                if (wasRemove(eventData.key)) {
                    removeResourceFromList(eventData.resource);
                } else if (wasEdit(eventData.key)) {
                    updateResourceInList(eventData.resource);
                }
            }
        });
    }

    travi.register('ui.entityList.updates', {
        init: init
    });
}(travi));