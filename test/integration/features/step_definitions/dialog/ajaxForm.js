addStepDefinitions(function (scenario) {
    'use strict';

    var any = travi.test.any,

        formPage = any.string(),
        formSubmission = any.string();

    function dialogIsOpen() {
        return $('#dialogContent').length === 1;
    }

    scenario.Before(function (callback) {
        var world = this;

        this.simulatePageLoad();

        $.mockjax({
            url: formPage,
            responseText: '<section id="dialogContent"><form action="' + formSubmission + '" method="post"></form></section>'
        });

        $.mockjax({
            url: formSubmission,
            response: function () {
                this.status = world.getExpectedResponseStatus();

                var responseHeaders = world.getResponseHeaders();
                if (responseHeaders) {
                    this.headers = responseHeaders;
                }

                this.responseText = {};
            }
        });

        callback();
    });

    scenario.Given(/^a dialog containing a form has been launched$/, function (callback) {
        $('#scratch').append('<a href="' + formPage + '" class="dialog-target" id="dialogLink"></a>');

        $('#dialogLink').click();

        this.getDeferredFromRequestTo(formPage).then(function () {
            if (dialogIsOpen()) {
                callback();
            } else {
                callback.fail('The dialog did not open.');
            }
        });
    });

    scenario.When(/^the form has been submitted successfully$/, function (callback) {
        this.setExpectedResponseStatus(200);

        $('form').submit();

        this.getDeferredFromRequestTo(formSubmission).then(function () {
            callback();
        });
    });

    scenario.When(/^the form has been submitted with a failure$/, function (callback) {
        this.setExpectedResponseStatus(500);

        $('form').submit();

        $.ajax.returnValues[1].then(
            function () {
                callback.fail("Shouldn't have gotten a successful response");
            },
            function () {
                callback();
            }
        );
    });

    scenario.Then(/^the dialog should be closed$/, function (callback) {
        if (dialogIsOpen()) {
            callback.fail('The dialog is still open.');
        } else {
            callback();
        }
    });

    scenario.Then(/^the dialog should still be open$/, function (callback) {
        if (dialogIsOpen()) {
            callback();
        } else {
            callback.fail('The dialog is closed.');
        }
    });

    scenario.After(function (callback) {
        this.cleanUp();

        callback();
    });
});