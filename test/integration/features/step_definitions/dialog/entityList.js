addStepDefinitions(function (scenario) {
    'use strict';

    var any = travi.test.any,

        addedEntity = any.string(),
        updatedEntity = any.string(),
        removedEntity = any.string(),
        newContent = any.string(),
        removeLink = any.string(),

        entityCount;

    function entityWasAdded() {
        return $('.entityList li.entityBlock').length === entityCount + 1;
    }

    function entityWasRemoved() {
        return $('.entityList li.entityBlock').length === entityCount - 1;
    }

    scenario.Before(function (callback) {
        this.getServer().respondWith('get', addedEntity, [200, {}, '<li class="entityBlock"></li>']);
        this.getServer().respondWith(
            'get',
            updatedEntity,
            [200, {}, '<li class="entityBlock" travi-self="' + updatedEntity + '">' + newContent + '</li>']
        );

        callback();
    });

    scenario.Given(/^on an entity list page$/, function (callback) {
        $('#scratch').append(
            '<ol class="entityList"><li class="entityBlock" travi-self="'
                + updatedEntity
                + '">old content<ul class="actions"><li class="remove-item"><a href="'
                + removeLink
                + '" class="dialog-target">Remove</a></li></ul> </li></ol>'
        );

        entityCount = $('ol.entityList > li').length;

        callback();
    });

    scenario.Given(/^the remove link was clicked on one of the entities in the list$/, function (callback) {
        this.getServer().respondWith(
            'get',
            removeLink,
            [
                200,
                {},
                '<div><form travi-form-key="remove-resource" method="post" action="' + removedEntity + '"></form></div>'
            ]
        );

        $('.entityBlock:first .remove-item a').click();

        this.getServer().respond();
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

    scenario.When(/^the confirm button is clicked$/, function (callback) {
        var $form = $('form[travi-form-key=remove-resource]');
        this.getServer().respondWith('post', removedEntity, [200, {}, JSON.stringify({
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

        var text = $('li.entityBlock[travi-self="' + updatedEntity + '"]').text();
        if (text === newContent) {
            callback();
        } else {
            callback.fail('expected updated entity\'s content to be ' + newContent + ' but was ' + text);
        }

        callback();
    });

    scenario.Then(/^the entity will no longer be present in the list$/, function (callback) {
        if (entityWasRemoved()) {
            callback();
        } else {
            callback.fail('entity not removed');
        }
    });

    scenario.After(function (callback) {
        entityCount = null;

        callback();
    });
});