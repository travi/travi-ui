addStepDefinitions(function (scenario) {
    var formPage = '/some/url',
        formSubmission = '/form/submission';

    // Provide a custom World constructor. It's optional, a default one is supplied.
    scenario.World = function (callback) {
        callback();
    };



    // Define your World, here is where you can add some custom utlity functions you
    // want to use with your Cucumber step definitions, this is usually moved out
    // to its own file that you include in your Karma config
    var proto = scenario.World.prototype;
    proto.appSpecificUtilityFunction = function someHelperFunc() {
        // do some common stuff with your app
    };



    scenario.Before(function (callback) {
        // Use a custom utility function
        this.appSpecificUtilityFunction();

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





    scenario.Given(/^a dialog containing a form has been launched$/, function(callback) {
        $('#scratch').append('<a href="' + formPage + '" class="dialog-target" id="dialogLink"></a>');

        $('#dialogLink').click();

        callback();
    });

    scenario.Given(/^the form has been submitted$/, function(callback) {
        $.ajax.returnValues[0].then(function () {
            console.log($('#dialogContent').length);
            $('form').submit();

            callback();
        });
    });

    scenario.When(/^a successful response is received$/, function(callback) {
        $.ajax.returnValues[1].then(function () {
            console.log('form response');
            callback();
        });
    });

    scenario.Then(/^the dialog should be closed$/, function(callback) {
        console.log($('#dialogContent').length);
        if ($('#dialogContent').length) {
            callback.fail('The dialog is still open.');
        } else {
            callback();
        }
    });




    scenario.After(function (callback) {
        $('#scratch').empty();

        callback();
    });
});