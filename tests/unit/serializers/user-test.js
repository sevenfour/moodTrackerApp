import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user', 'Unit | Serializer | user', {
    needs: [ 'serializer:user', 'model:locale' ]
});

test('it serializes records', function(assert) {
    'use strict';

    let record = this.subject();
    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
});
