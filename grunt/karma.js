module.exports = {
    unit: {
        configFile: 'karma.conf.js',
        singleRun: true,

        preprocessors: {
            "js/**/*.js": "coverage"
        },

        reporters: [
            'progress',
            'junit',
            'coverage'
        ],

        junitReporter: {
            outputFile: 'logs/karma.xml'
        },

        coverageReporter: {
            type: "lcov",
            dir: 'logs/coverage/'
        }
    }
};