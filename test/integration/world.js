/*global amplify */
addStepDefinitions(function (scenario) {
    'use strict';

    var expectedResponseStatus,
        responseHeaders = {},
        proto = scenario.World.prototype,
        server;

    function clearAjax() {
        $.ajax.restore();

        expectedResponseStatus = null;
        responseHeaders = {};
    }

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
        amplify.restore();
        clearAjax();
        server.restore();
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

    proto.setExpectedResponseStatus = function setExpectedResponseStatus(status) {
        if (!expectedResponseStatus) {
            expectedResponseStatus = status;
        }
    };

    proto.getExpectedResponseStatus = function getExpectedResponseStatus() {
        return expectedResponseStatus;
    };

    proto.addHeader = function addHeader(name, value) {
        responseHeaders[name] = value;
    };

    proto.getResponseHeaders = function getResponseHeaders() {
        return responseHeaders;
    };
});