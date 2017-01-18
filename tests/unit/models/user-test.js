import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user', 'Unit | Model | user', {
    // Specify the other units that are required for this test.
    needs: ['model:locale']
});

test('it exists', function(assert) {
    'use strict';

    let model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
});
