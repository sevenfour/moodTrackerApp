import DS from 'ember-data';
import computed from 'ember-computed';
import service from 'ember-service/inject';

const { RESTAdapter } = DS;

export default RESTAdapter.extend({

    namespace: 'mobile/api',

    session: service(),

    headers: computed(function() {
        'use strict';

        const { token } = this.get('session.data.authenticated');

        let header = {};

        if (this.get('session.isAuthenticated') && token) {
            header.Authorization = `Basic ${token}`;
        }

        return header;
    })

});
