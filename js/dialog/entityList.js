(function (travi) {
    'use strict';

    function init() {
        travi.ui.dialog.events.form({
            success: function (data) {
                $.ajax({
                    url: data.resource,
                    type: 'get',
                    dataType: 'html',
                    success: function (html) {
                        $('#' + data.resource).html(html);
                    }
                });
            }
        });
    }

    travi.register('ui.dialog.entityList', {
        init: init
    });
}(travi));