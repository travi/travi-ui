module.exports = function (config) {
    config.set({
        frameworks: [
            'cucumberjs',
            'referee'
        ],

        files: [
            'bower_components/amplify/core/amplify.core.js',
            'test/resources/amplifyProxy.js',
            'bower_components/jquery/jquery.js',
            'bower_components/jquery-ui/ui/jquery-ui.js',
            'bower_components/jquery-migrate/jquery-migrate.js',
            'bower_components/wymeditor/dist/wymeditor/jquery.wymeditor.js',

            'bower_components/travi-core/js/travi.js',
            'test/resources/registerProxy.js',
            'bower_components/travi-core/js/travi/dependencies/checker.js',
            'bower_components/travi-core/js/travi/events.js',

            'js/form/richText.js',

            'js/dialog/events.js',
            'js/dialog/simple.js',
            'js/dialog/**/*.js',

            {pattern: 'node_modules/karma-cucumberjs/vendor/cucumber-html.css', watched: false, included: false, served: true},
            {pattern: 'test/integration/app.template', watched: false, included: false, served: true},

            {pattern: 'test/integration/features/**/*.feature', watched: true, included: false, served: true},

            'bower_components/travi-test-utils/tools/common.js',
            'test/integration/world.js',
            {pattern: 'test/integration/features/step_definitions/**/*.js', watched: true, included: true, served: true}
        ],

        browsers: ['PhantomJS'],

        singleRun: true
    });
};
