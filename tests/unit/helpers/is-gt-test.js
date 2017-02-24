import { isGt } from '../../../helpers/is-gt';
import { module, test } from 'qunit';

module('Unit | Helper | is gt');

test('it works', function(assert) {
    'use strict';

    const objectA = {
        value: 10
    };

    const objectB = {
        value: 5
    };

    let result = isGt([ objectA, 5, 'value' ]);
    assert.ok(result);
    result = isGt([ objectA, 15, 'value' ]);
    assert.notOk(result);
    result = isGt([ objectA, objectB, 'value' ]);
    assert.ok(result);
    result = isGt([ objectB, objectA, 'value' ]);
    assert.notOk(result);
    result = isGt([ 10, 5 ]);
    assert.ok(result);
});
