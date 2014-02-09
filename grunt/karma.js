module.exports = {
    unit: {
        configFile: 'ui.conf.js',
        singleRun: true,

        preprocessors: {
            "js/travi/**/*.js": 'coverage'
        },

        reporters: [
            'progress',
            'junit',
            'coverage'
        ],

        junitReporter: {
            outputFile: 'logs/ui.xml'
        },

        coverageReporter: {
            type: 'lcov',
            dir: 'logs/coverage/'
        }
    }
};
