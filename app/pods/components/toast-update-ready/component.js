import Component from 'ember-component';
import service from 'ember-service/inject';
import computed from 'ember-computed';

const { alias } = computed;

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

            this.get('notify.waitingWorker').postMessage({
                action: 'skipWaiting'
            });
        }

    }

});
