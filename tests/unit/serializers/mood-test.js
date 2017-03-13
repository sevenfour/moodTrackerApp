import { moduleForModel, test } from 'ember-qunit';

moduleForModel('mood', 'Unit | Serializer | mood', {
    needs: [ 'serializer:mood', 'model:stressor' ]
});

test('it serializes records', function(assert) {
    'use strict';

    assert.expect(0);

    // let record = this.subject();
    // let serializedRecord = record.serialize();
    // assert.ok(serializedRecord);
});
