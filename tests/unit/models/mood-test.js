import { moduleForModel, test } from 'ember-qunit';

moduleForModel('mood', 'Unit | Model | mood', {
    needs: [ 'model:stressor', 'model:trigger' ]
});

test('it exists', function(assert) {
    'use strict';

    let model = this.subject();
    assert.ok(!!model);
});
