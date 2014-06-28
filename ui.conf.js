module.exports = function (config) {
    config.set({
        frameworks: ['referee'],

        files: [
            {pattern: 'test/templates/**/*.tmpl', included: false},

            'bower_components/travi-test-utils/tools/assert-cache.js',
            'node_modules/karma-jstd-adapter/jstd-adapter.js',
            'bower_components/travi-test-utils/tools/assert-fix.js',

            'bower_components/jquery/jquery.js',
            'bower_components/jquery-ui/ui/jquery-ui.js',
            'bower_components/jsrender/jsrender.js',
            'bower_components/jquery-form/jquery.form.js',
            'bower_components/jquery-migrate/jquery-migrate.js',
            'bower_components/wymeditor/dist/wymeditor/jquery.wymeditor.js',
            'bower_components/travi-test-utils/stubs/amplifyStub.js',

            'bower_components/travi-core/js/travi.js',
            'bower_components/travi-test-utils/tools/common.js',
            'bower_components/travi-core/js/travi/templates.js',
            'test/resources/load-ui-templates.js',
            'bower_components/travi-core/js/travi/events.js',
            'bower_components/travi-core/js/travi/dependencies/checker.js',
            'js/pagination.js',
            'bower_components/travi-test-utils/test-init.js',
            'js/form/*.js',
            'js/dialog/events.js',
            'js/dialog/core.js',
            'js/**/*.js',

            'bower_components/travi-test-utils/stubs/ajaxStub.js',

            'test/**/*.jstd'
        ],

        browsers: ['PhantomJS']
    });
};
