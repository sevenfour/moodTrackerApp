
// Example: '17/11/16'
export function formatShort(date) {
    'use strict';

    if (date) {
        let dateObj = new Date(date);

        let day = dateObj.getDate();
        if (day < 10) {
            day = `0${day}`;
        }

        let month = dateObj.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`;
        }
        return `${day}/${month}/${dateObj.getFullYear()}`;
    }
    return '';
}

// create a date object from a date and time string (e.g. 11:30)
export function getDate(date, time) {
    'use strict';

    let moodTimeArr = time.replace(/[^0-9, /:]+/g, '').toString().split(':');
    let newDate = new Date(date);

    newDate.setHours(moodTimeArr[0], moodTimeArr[1], 0, 0);

    return newDate;
}

// get the time portion (hours:minutes) from a date.
export function getTime(date) {
    'use strict';

    if (date) {
        let hours = date.getHours();
        let minutes = date.getMinutes() || '00';

        if (parseInt(minutes, 10) < 10 && minutes !== '00') {
            minutes = `0${minutes}`;
        }

        return `${hours}:${minutes}`;
    } else {
        return null;
    }
}
