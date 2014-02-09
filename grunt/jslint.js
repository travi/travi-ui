module.exports = {
    config: {
        src: [
            'Gruntfile.js',
            'grunt/**/*.js'
        ],
        directives: {
            node: true
        },
        options: {
            errorsOnly: true,
            checkstyle: 'logs/jslint-config.xml'
        }
    },
    dist: {
        src: [
            'js/**/*.js'
        ],
        directives: {
            browser: true,
            predef: [
                '$',
                'jQuery',
                'Modernizr',
                'travi'
            ]
        },
        options: {
            errorsOnly: true,
            checkstyle: 'logs/jslint-ui.xml'
        }
    },
    test: {
        src: [
            'test/**/*.jstd'
        ],
        directives: {
            browser: true,
            predef: [
                '$',
                'jQuery',
                'travi',

                'sinon',
                'assertEquals',
                'assertSame',
                'assertNotSame',
                'assertString',
                'assertObject',
                'assertFunction',
                'assert',
                'refute',
                'assertFalse',
                'assertTrue',
                'expectAsserts'
            ]
        },
        options: {
            errorsOnly: true,
            checkstyle: 'logs/jslint-ui-test.xml'
        }
    }
};
