/*global amplify */
addStepDefinitions(function (scenario) {
    'use strict';

    var expectedResponseStatus,
        responseHeaders = {};

    function clearAjax() {
        $.ajax.restore();
        $.mockjaxClear();

        expectedResponseStatus = null;
        responseHeaders = {};
    }

    function cleanUpDom() {
        $('body').off();
        $('#scratch').empty();
        travi.ui.dialog.simple.close();
    }

    // Provide a custom World constructor. It's optional, a default one is supplied.
    scenario.World = function (callback) {
        callback();
    };

    // Define your World, here is where you can add some custom utility functions you
    // want to use with your Cucumber step definitions
    var proto = scenario.World.prototype;

    proto.simulatePageLoad = function simulatePageLoad() {
        sinon.spy($, 'ajax');

        travi.reload();
    };

    proto.cleanUp = function cleanUp() {
        cleanUpDom();
        amplify.restore();
        clearAjax();
    };

    proto.getDeferredFromRequestTo = function getDeferredFromRequestTo(url) {
        for (var i = 0; i < $.ajax.callCount; i++) {
            var call = $.ajax.getCall(i);

            var url2 = call.args[0].url;
            console.log(url2);
            if (url === url2) {
                return $.ajax.returnValues[i];
            }
        }

        return null;
    }

    proto.setExpectedResponseStatus = function setExpectedResponseStatus(status) {
        if (!expectedResponseStatus) {
            expectedResponseStatus = status;
        }
    }

    proto.getExpectedResponseStatus = function getExpectedResponseStatus() {
        return expectedResponseStatus;
    }

    proto.addHeader = function addHeader(name, value) {
        responseHeaders[name] = value;
    }

    proto.getResponseHeaders = function getResponseHeaders() {
        return responseHeaders;
    }
});