/* global require, module */
let EmberApp = require('ember-cli/lib/broccoli/ember-app');
let autoprefixer = require('autoprefixer');

module.exports = function(defaults) {
    let app = new EmberApp(defaults, {
        outputPaths: {
            app: {
                css: {
                    'app': '/assets/moodtracker.css',
                    'appshell': '/assets/appshell.css'
                },
                js: '/assets/moodtracker.js'
            }
        },

        fingerprint: {
            exclude: ['img']
        },

        storeConfigInMeta: false,

        svg: {
            optimize: false,
            paths: [
                'app/svg-store'
            ]
        },

        postcssOptions: {
            compile: {
                enabled: false
            },
            filter: {
                enabled: true,
                plugins: [
                    {
                        module: autoprefixer
                    }
                ]
            }
        },

        // ember-cli-inline-content
        inlineContent: {
            'app-shell-css': './dist/assets/appshell.css'
        }
    });

    // Load Pickadate libraries
    app.import('bower_components/pickadate/lib/legacy.js');
    app.import('bower_components/pickadate/lib/picker.js');
    app.import('bower_components/pickadate/lib/picker.date.js');
    app.import('bower_components/pickadate/lib/picker.time.js');

    return app.toTree();
};
