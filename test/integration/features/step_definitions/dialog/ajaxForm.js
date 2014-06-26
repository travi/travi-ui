addStepDefinitions(function (scenario) {
    'use strict';

    var any = travi.test.any,

        formPage = any.string(),
        formSubmission = any.string(),
        fieldName = any.string();

    function dialogIsOpen() {
        return $('#dialogContent').length === 1;
    }

    scenario.Before(function (callback) {
        this.simulatePageLoad();

        callback();
    });

    scenario.Given(/^a dialog containing a form with key "([^"]*)" has been launched$/, function (key, callback) {
        $('#scratch').append('<a href="' + formPage + '" class="dialog-target" id="dialogLink"></a>');

        this.getServer().respondWith(
            'get',
            formPage,
            [
                200,
                {},
                '<section id="dialogContent"><form action="' + formSubmission + '" method="post" travi-form-key="' + key + '"><ol><li><input name="' + fieldName + '"></li></ol></form></section>'
            ]
        );

        $('#dialogLink').click();

        this.getServer().respond();

        if (dialogIsOpen()) {
            callback();
        } else {
            callback.fail('The dialog did not open.');
        }
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

    scenario.When(/^the form has been submitted with a validation error$/, function (callback) {
        var errors = {};
        errors[fieldName] = any.string();
        this.getServer().respondWith('post', formSubmission, [400, {}, JSON.stringify({form: {errors: errors}})]);

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

    scenario.Then(/^the validation errors should be shown$/, function (callback) {
        if ($('form label.ui-state-error').length) {
            callback();
        } else {
            callback.fail('error messages not shown');
        }
    });

    scenario.After(function (callback) {
        this.cleanUp();

        callback();
    });
});