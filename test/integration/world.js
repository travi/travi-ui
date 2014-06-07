/*global amplify */
addStepDefinitions(function (scenario) {
    'use strict';

    var proto = scenario.World.prototype,
        server;

    function cleanUpDom() {
        $('body').off();
        $('#scratch').empty();
        travi.ui.dialog.simple.close();
    }

    proto.simulatePageLoad = function simulatePageLoad() {
        sinon.spy($, 'ajax');
        server = sinon.fakeServer.create();

        travi.reload();
    };

    proto.cleanUp = function cleanUp() {
        cleanUpDom();

        travi.test.common.restore([
            amplify,
            server,
            $.ajax
        ]);
    };

    proto.getServer = function getServer() {
        return server;
    };

    proto.getDeferredFromRequestTo = function getDeferredFromRequestTo(url) {
        var i,
            call;

        for (i = 0; i < $.ajax.callCount; i += 1) {
            call = $.ajax.getCall(i);

            if (url === call.args[0].url) {
                return $.ajax.returnValues[i];
            }
        }

        return null;
    };
});