import run from 'ember-runloop';
import Application from 'ember-application';
import { initialize } from 'mood-tracker-app/instance-initializers/sw-registration';
import { module, test } from 'qunit';
// import destroyApp from '../../helpers/destroy-app';

module('Unit | Instance Initializer | sw registration', {
    beforeEach() {
        run(() => {
            this.application = Application.create();
            this.appInstance = this.application.buildInstance();
        });
    },
    afterEach() {
        run(this.appInstance, 'destroy');
        // destroyApp(this.application);
    }
});

test('it works', function(assert) {
    'use strict';

    initialize(this.appInstance);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
});
