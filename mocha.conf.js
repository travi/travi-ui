module.exports = function (config) {
    config.set({
        frameworks: [
            'referee',
            'mocha-given',
            'mocha'
        ],

        preprocessors: {
            '**/*.coffee': ['coffee']
        },

        files: [
            'test/integration/**/*.coffee'
        ],

        exclude: [
            'bower_components/travi-test-utils/tools/cucumber-world.js'
        ],

        //client: {
        //    mocha: {
        //        reporter: 'spec',
        //        ui: 'mocha-given'
        //    }
        //},

        browsers: ['PhantomJS']
    });
};
