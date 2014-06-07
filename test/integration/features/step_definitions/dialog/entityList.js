addStepDefinitions(function (scenario) {
    'use strict';

    var any = travi.test.any,

        addedEntity = any.string(),
        updatedEntity = any.string(),
        newContent = any.string(),

        entityCount;

    function entityWasAdded() {
        return $('.entityList li.entityBlock').length === entityCount + 1;
    }

    scenario.Before(function (callback) {
        this.getServer().respondWith('get', addedEntity, [200, {}, '<li class="entityBlock"></li>']);
        this.getServer().respondWith('get', updatedEntity, [200, {}, '<li class="entityBlock">' + newContent + '</li>']);

        callback();
    });

    scenario.Given(/^on an entity list page$/, function (callback) {
        $('#scratch').append('<ol class="entityList" id="' + updatedEntity + '"><li class="entityBlock">old content</li></ol>');

        entityCount = $('ol.entityList li').length;

        callback();
    });

    scenario.When(/^the add\-entity form has been submitted successfully$/, function (callback) {
        var $form = $('form');
        this.getServer().respondWith('post', $form.attr('action'), [201, {Location: addedEntity}, '{}']);

        $form.submit();

        this.getServer().respond();
        callback();
    });

    scenario.When(/^the update\-entity form has been submitted successfully$/, function (callback) {
        var $form = $('form');
        this.getServer().respondWith('post', $form.attr('action'), [200, {}, JSON.stringify({
            resource: updatedEntity
        })]);

        $form.submit();

        this.getServer().respond();

        callback();
    });

    scenario.Then(/^the new entity is shown in the list$/, function (callback) {
        this.getServer().respond();

        if (entityWasAdded()) {
            callback();
        } else {
            callback.fail('entity not added');
        }
    });

    scenario.Then(/^the existing entity is updated in the list$/, function (callback) {
        this.getServer().respond();

        var text = $('#' + updatedEntity).text();
        if (text === newContent) {
            callback();
        } else {
            callback.fail('expected updated entity\'s content to be ' + newContent + ' but was ' + text);
        }

        callback();
    });

    scenario.After(function (callback) {
        entityCount = null;

        callback();
    });
});