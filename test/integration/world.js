addStepDefinitions(function (scenario) {
    'use strict';


    // Provide a custom World constructor. It's optional, a default one is supplied.
    scenario.World = function (callback) {
        callback();
    };

    // Define your World, here is where you can add some custom utility functions you
    // want to use with your Cucumber step definitions
    var proto = scenario.World.prototype;
    proto.appSpecificUtilityFunction = function someHelperFunc() {
        // do some common stuff with your app
    };
    proto.cleanUp = function cleanUp() {
        $('#scratch').empty();

        amplify.restore();
    };
})