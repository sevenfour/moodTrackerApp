import set from 'ember-metal/set';

// Clear object properties
export function clearObject(obj) {
    'use strict';

    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            set(obj, `${prop}`, null);
        }
    }
}
