addStepDefinitions(function (scenario) {
    'use strict';

    var formPage = '/some/url',
        formSubmission = '/form/submission';


    scenario.Before(function (callback) {
        this.simulatePageLoad();

        $.mockjax({
            url: formPage,
            responseText: '<section id="dialogContent"><form action="' + formSubmission + '" method="post"></form></section>'
        });

        $.mockjax({
            url: formSubmission,
            responseText: {}
        });

        sinon.spy($, 'ajax');

        callback();
    });

    scenario.Given(/^a dialog containing a form has been launched$/, function (callback) {
        $('#scratch').append('<a href="' + formPage + '" class="dialog-target" id="dialogLink"></a>');

        $('#dialogLink').click();

        callback();
    });

    scenario.Given(/^the form has been submitted$/, function (callback) {
        $.ajax.returnValues[0].then(function () {
            $('form').submit();

            callback();
        });
    });

    scenario.When(/^a successful response is received$/, function (callback) {
        $.ajax.returnValues[1].then(function () {
            callback();
        });
    });

    scenario.Then(/^the dialog should be closed$/, function (callback) {
        if ($('#dialogContent').length) {
            callback.fail('The dialog is still open.');
        } else {
            callback();
        }
    });




    scenario.After(function (callback) {
        this.cleanUp();

        callback();
    });
});