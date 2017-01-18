import Helper from 'ember-helper';

export function isEqual([ leftSide, rightSide, valueId ]) {
    'use strict';

    if (valueId) {
        if (rightSide && rightSide.hasOwnProperty(valueId)) {
            return leftSide[valueId] === rightSide[valueId];
        } else {
            return leftSide[valueId] === rightSide;
        }
    } else {
        return leftSide === rightSide;
    }
}

export default Helper.helper(isEqual);
