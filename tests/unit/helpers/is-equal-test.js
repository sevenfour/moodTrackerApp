
import { isEqual } from 'mood-tracker-app/helpers/is-equal';
import { module, test } from 'qunit';

module('Unit | Helper | is equal');

test('it works', function(assert) {
    'use strict';

    const object = {
        value: 'one'
    };

    const object2 = {
        value: 'two'
    };

    let result = isEqual([ object, 'one', 'value' ]);
    assert.ok(result);
    result = isEqual([ object, 'two', 'value' ]);
    assert.notOk(result);
    result = isEqual([ object, object, 'value' ]);
    assert.ok(result);
    result = isEqual([ object, object2, 'value' ]);
    assert.notOk(result);
    result = isEqual([ 'one', 'one' ]);
    assert.ok(result);
});
