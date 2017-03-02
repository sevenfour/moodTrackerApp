import { moduleForModel, test } from 'ember-qunit';

moduleForModel('config', 'Unit | Serializer | config', {
    needs: [ 'serializer:config', 'model:stressor', 'model:trigger' ]
});

test('it serializes records', function(assert) {
    'use strict';

    let record = this.subject();
    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
});
