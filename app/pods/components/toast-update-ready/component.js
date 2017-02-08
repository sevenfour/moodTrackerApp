import Component from 'ember-component';
import service from 'ember-service/inject';
import { alias } from 'ember-computed';

export default Component.extend({

    notify: service(),

    classNames: ['toast-update-ready'],

    classNameBindings: ['isUpdateReady:update-ready'],

    isUpdateReady: alias('notify.isUpdateReady'),

    actions: {

        dismiss() {
            'use strict';

            this.get('notify').cancelUpdate();
        },

        reload() {
            'use strict';

            const worker = this.get('notify.waitingWorker');

            if (worker && worker.state !== 'redundant') {
                worker.postMessage({
                    action: 'skipWaiting'
                });
            } else {
                window.location.reload();
            }
        }

    }

});
