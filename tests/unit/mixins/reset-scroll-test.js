import Object from 'ember-object';
import ResetScrollMixin from 'mood-tracker-app/mixins/reset-scroll';
import { module, test } from 'qunit';

module('Unit | Mixin | reset scroll');

test('it works', function(assert) {
    'use strict';

    let ResetScrollObject = Object.extend(ResetScrollMixin);
    let subject = ResetScrollObject.create();
    assert.ok(subject);
});
