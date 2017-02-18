export function checkFirstName(name) {
    'use strict';

    if (name && name.length > 50) {
        return name.slice(0, 50);
    } else {
        return name;
    }
}

export function b64EncodeUnicode(str) {
    'use strict';

    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(`0x${p1}`);
    }));
}
