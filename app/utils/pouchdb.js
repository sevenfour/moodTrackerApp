// PouchDB related utility functions

export function createSyncIndex(db) {
    'use strict';

    db.createIndex({
        index: {
            fields: ['isSynced'],
            name: 'syncIndex',
            ddoc: 'by_isSynced'
        }
    }).then(() => {
        return db;
    }).catch(() => {
        return null;
    });
}

export function createMoodTimeIndex(db) {
    'use strict';

    db.createIndex({
        index: {
            fields: ['moodTimeInMillisec'],
            name: 'moodTimeInMillisecIndex',
            ddoc: 'by_moodTimeInMillisec'
        }
    }).then(() => {
        return db;
    }).catch(() => {
        return null;
    });
}
