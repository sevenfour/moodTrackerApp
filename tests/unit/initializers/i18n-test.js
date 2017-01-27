import { initialize } from 'mood-tracker-app/initializers/i18n';
import { module, test } from 'qunit';
import Application from 'ember-application';
import run from 'ember-runloop';

module('Unit | Initializer | i18n', {
    beforeEach() {
      run(() => {
        this.application = Application.create();
        this.application.deferReadiness();
      });
    }
});

test('it works', function(assert) {
    'use strict';

    initialize(this.application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
});
