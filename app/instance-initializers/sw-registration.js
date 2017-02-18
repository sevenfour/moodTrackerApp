import debug from 'ember-debug';
import RSVP from 'rsvp';

const { log } = debug;

export function initialize(appInstance) {
    'use strict';

    // Fastboot compatibility check
    if (window && window.navigator) {
        if ('serviceWorker' in window.navigator) {
            window.navigator.serviceWorker.register('/service-worker.js', { scope: './' }).then((reg) => {
                log('Service Worker successfully registered.');

                // Get notify service
                let notify = appInstance.lookup('service:notify');

                if (reg.waiting) {
                    log('req.waiting: update is waiting');
                    this.updateReady(reg.waiting, notify);

                    return;
                }

                if (reg.installing) {
                    log('reg.installing: update in progress');

                    this.trackInstalling(reg.installing).then((worker) => {
                        this.updateReady(worker, notify);
                    });
                    return;
                }

                reg.onupdatefound = () =>  {
                    log('Update found');
                    this.trackInstalling(reg.installing).then((worker) => {
                        this.updateReady(worker, notify);
                    });
                };
            }).catch((error) => {
                log(`An error occured registering Service Wroker: ${error}`);
            });

            let refreshing = false;

            window.navigator.serviceWorker.oncontrollerchange = () => {
                if (!refreshing) {
                    log('Reload page');
                    window.location.reload();
                    refreshing = true;
                }
            };
        } else if ('applicationCache' in window) {
            log('Service Worker is not available; falling back to app cache');
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
}

export default {

    name: 'sw-registration',

    initialize,

    trackInstalling(worker) {
        'use strict';

        return new RSVP.Promise((resolve) => {
            worker.onstatechange = () => {
                if (worker.state === 'installed') {
                    resolve(worker);
                }
            };
        });
    },

    updateReady(worker, notifyService) {
        'use strict';
        notifyService.set('isUpdateReady', true);
        notifyService.set('waitingWorker', worker);
    }
};
