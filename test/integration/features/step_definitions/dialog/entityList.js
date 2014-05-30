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
        this.getServer().respondWith([201, {Location: addedEntity}, '{}']);
        this.setExpectedResponseStatus(201);
        this.addHeader('Location', addedEntity);

        callback();
    });

    scenario.When(/^the add\-entity form has been submitted successfully$/, function(callback) {
        var $form = $('form');
        this.getServer().respondWith('post', $form.attr('action'), [201, {Location: addedEntity}, '{}']);

        $form.submit();

        this.getServer().respond();
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