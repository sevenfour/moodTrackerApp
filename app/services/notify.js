import Service from 'ember-service';

export default Service.extend({

    isUpdateReady: false,

    waitingWorker: null,

    cancelUpdate() {
        'use strict';

        this.set('isUpdateReady', false);
        this.set('waitingWorker', null);
    }

});
