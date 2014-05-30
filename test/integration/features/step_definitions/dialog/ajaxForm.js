addStepDefinitions(function (scenario) {
    'use strict';

    var any = travi.test.any,

        formPage = any.string(),
        formSubmission = any.string();

    function dialogIsOpen() {
        return $('#dialogContent').length === 1;
    }

    scenario.Before(function (callback) {
        this.simulatePageLoad();

        $.mockjax({
            url: formPage,
            responseText: '<section id="dialogContent"><form action="' + formSubmission + '" method="post"></form></section>'
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
        this.getServer().respondWith('post', formSubmission, [200, {}, '{}']);

        $('form').submit();

        this.getServer().respond();
        callback();
    });

    scenario.When(/^the form has been submitted with a failure$/, function (callback) {
        this.getServer().respondWith('post', formSubmission, [500, {}, "Failure"]);

        $('form').submit();

        this.getServer().respond();
        callback();
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