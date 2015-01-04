module.exports = function (config) {
    config.set({
        frameworks: [
            'cucumberjs',
            'referee'
        ],

        files: [
            'bower_components/amplify/core/amplify.core.js',
            'bower_components/travi-test-utils/proxies/amplifyProxy.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/jquery-ui/ui/jquery-ui.js',
            'bower_components/jsrender/jsrender.js',
            'bower_components/jquery-migrate/jquery-migrate.js',
            'bower_components/wymeditor/dist/wymeditor/jquery.wymeditor.js',

            'bower_components/travi-core/js/travi.js',
            'bower_components/travi-test-utils/proxies/registerProxy.js',
            'bower_components/travi-core/js/travi/dependencies/checker.js',
            'bower_components/travi-core/js/travi/events.js',
            'bower_components/travi-core/js/travi/templates.js',

            {pattern: 'test/templates/**/*.tmpl', included: false},
            'test/resources/load-templates-integration.js',

            'js/form/**/*.js',

            'js/dialog/events.js',
            'js/dialog/core.js',
            'js/dialog/**/*.js',

            'js/entityList/updates.js',

            {pattern: 'node_modules/karma-cucumberjs/vendor/cucumber-html.css', watched: false, included: false, served: true},
            {pattern: 'test/integration/app.template', watched: false, included: false, served: true},

            {pattern: 'test/integration/features/**/*.feature', watched: true, included: false, served: true},

            'bower_components/travi-test-utils/tools/*.js',
            {pattern: 'test/integration/features/step_definitions/**/*.js', watched: true, included: true, served: true}
        ],

        browsers: ['PhantomJS'],

        singleRun: true
    });
};
