
module.exports = function(environment) {
    let ENV = {
      modulePrefix: 'mood-tracker-app',
      podModulePrefix: 'mood-tracker-app/pods',
      environment: environment,
      rootURL: '/',
      locationType: 'auto',
      EmberENV: {
        FEATURES: {
          // Here you can enable experimental features on an ember canary build
          // e.g. 'with-controller': true
        },
        EXTEND_PROTOTYPES: {
          // Prevent Ember Data from overriding Date.parse.
          Date: false
        },
        // enable store.filter API feature
        ENABLE_DS_FILTER: true
      },

      APP: {
        // Here you can pass flags/options to your application instance
        // when it is created
      }
    };

    ENV.serviceWorker = {
        enabled: true,
        debug: true,
        swIncludeFiles: [
            'node_modules/pouchdb/dist/pouchdb.js'
        ],
    };

    if (environment === 'development') {
      ENV.APP.LOG_TRANSITIONS = true;
      // ENV.APP.LOG_RESOLVER = true;
      // ENV.APP.LOG_ACTIVE_GENERATION = true;
      // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
      // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
      // Testem prefers this...
      ENV.locationType = 'none';

      // keep test console output quieter
      ENV.APP.LOG_ACTIVE_GENERATION = false;
      ENV.APP.LOG_VIEW_LOOKUPS = false;

      ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {
        ENV.serviceWorker.debug = false;
    }

    ENV.contentSecurityPolicy = {
        'connect-src': "'self' http://localhost:8080",
        'script-src': "'self' 'unsafe-inline' http://localhost:8080 https://f.vimeocdn.com",
        'style-src': "'self' 'unsafe-inline'",
        'frame-src': "*",
        'img-src': "'self' https://andrewsmfstorage.s3.amazonaws.com"
    };

    // Localization setup
    ENV.i18n = {
        defaultLocale: 'en'
    };

    return ENV;
};
