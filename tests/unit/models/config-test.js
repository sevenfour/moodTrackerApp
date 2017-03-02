import { moduleForModel, test } from 'ember-qunit';

moduleForModel('config', 'Unit | Model | config', {
    needs: [ 'model:stressor', 'model:trigger' ]
});

test('it exists', function(assert) {
    'use strict';

    let model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
});
