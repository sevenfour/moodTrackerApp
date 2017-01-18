export function checkFirstName(name) {
    'use strict';

    if (name && name.length > 50) {
        return name.slice(0, 50);
    } else {
        return name;
    }
}
