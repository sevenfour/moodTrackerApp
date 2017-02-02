import Ember from 'ember';
import Application from 'ember-application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let moorTrackerApp;

Ember.MODEL_FACTORY_INJECTIONS = true;

moorTrackerApp = Application.extend({
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    Resolver
});

loadInitializers(moorTrackerApp, config.modulePrefix);

export default moorTrackerApp;
