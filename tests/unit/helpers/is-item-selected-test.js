import { isItemSelected } from '../../../helpers/is-item-selected';
import { module, test } from 'qunit';

module('Unit | Helper | is item selected');

test('it works', function(assert) {
    'use strict';

    const list = [ 1, 2 ];

    let result = isItemSelected([ 1, list ]);
    assert.equal(result, 'selected');

    result = isItemSelected([ 3, list ]);
    assert.equal(result, '');

});

test('it works for lists', function(assert) {
    'use strict';

    let result = isItemSelected([[ 1, 2 ], [ 2, 3 ]]);
    assert.equal(result, 'selected');

    result = isItemSelected([[ 1, 2 ], [3]]);
    assert.equal(result, '');

});
