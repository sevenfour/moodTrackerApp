import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
});

test('it exists', function(assert) {
    'use strict';

    let adapter = this.subject();
    assert.ok(adapter);
});
