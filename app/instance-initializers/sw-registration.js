import debug from 'ember-debug';

export function initialize(/* appInstance */) {
    'use strict';

    // appInstance.inject('route', 'foo', 'service:foo');

    if ('serviceWorker' in window.navigator) {
        window.navigator.serviceWorker.register('/service-worker.js').then((reg) => {
            debug.log('Service Worker successfully registered.');

            if (reg.waiting) {
                debug.log('New version available!');
                return;
            }

            if (reg.installing) {
                debug.log('Installing');
                return;
            }

            reg.addEventListener('updatefound', () =>  {
                debug.log('Update found');
            });
        }).catch((error) => {
            debug.log(`An error occured registering Service Wroker: ${error}`);
        });
    } else {
        debug.log('Service Worker is not available; falling back to app cache');
        window.addEventListener('load', () => {
            window.applicationCache.addEventListener('updateready', () => {
                if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
                    window.applicationCache.swapCache();
                    window.location.reload();
                }
            }, false);
        }, false);
    }
}

export default {
    name: 'sw-registration',
    initialize
};
