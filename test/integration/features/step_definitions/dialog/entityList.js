addStepDefinitions(function (scenario) {
    'use strict';

    var addedEntity = travi.test.any.string();

    function entityWasAdded() {
        return $('.entityList li').length === 1;
    }

    scenario.Before(function (callback) {
        $.mockjax({
            url: addedEntity,
            responseText: {}
        });

        callback();
    });

    scenario.Given(/^on an entity list page$/, function (callback) {
        $('#scratch').append('<ol class="entityList"></ol>');

        callback();
    });

    scenario.Given(/^add button has been clicked$/, function (callback) {
        this.setExpectedResponseStatus(201);
        this.addHeader('Location', addedEntity);

        callback();
    });

    scenario.Then(/^the new entity is shown in the list$/, function (callback) {
        this.getDeferredFromRequestTo(addedEntity).then(function () {
            if (entityWasAdded()) {
                callback();
            } else {
                callback.fail('entity not added');
            }
        });
    });
});