addStepDefinitions(function (scenario) {
    'use strict';

    var formPage = '/some/url',
        formSubmission = '/form/submission',
        formSubmissionSuccess;

    function dialogIsOpen() {
        return $('#dialogContent').length === 1;
    }

    scenario.Before(function (callback) {
        this.simulatePageLoad();

        $.mockjax({
            url: formPage,
            responseText: '<section id="dialogContent"><form action="' + formSubmission + '" method="post"></form></section>'
        });

        $.mockjax({
            url: formSubmission,
            response: function () {
                if (formSubmissionSuccess) {
                    this.status = 200;
                } else {
                    this.status = 500;
                }
            }
        });

        callback();
    });

    scenario.Given(/^a dialog containing a form has been launched$/, function (callback) {
        $('#scratch').append('<a href="' + formPage + '" class="dialog-target" id="dialogLink"></a>');

        $('#dialogLink').click();

        $.ajax.returnValues[0].then(function () {
            if (dialogIsOpen()) {
                callback();
            } else {
                callback.fail('The dialog did not open.');
            }
        });
    });

    scenario.When(/^the form has been submitted successfully$/, function (callback) {
        formSubmissionSuccess = true;

        $('form').submit();

        $.ajax.returnValues[1].then(function () {
            callback();
        });
    });

    scenario.When(/^the form has been submitted with a failure$/, function (callback) {
        formSubmissionSuccess = false;

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