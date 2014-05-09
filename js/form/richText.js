(function (travi) {
    'use strict';

    travi.register('ui.form.richText', {
        init: function () {
            $('textarea.richEditor').wymeditor({
                skin: 'silver',
                updateSelector: 'form',
                postInit: function (wym) {
                    wym.fullscreen();
                }
            });
        }
    });
}(travi));