import PouchDB from 'pouchdb';
import computed from 'ember-computed';
import service from 'ember-service/inject';
import config from '../config/environment';
import debug from 'ember-debug';
import { Adapter } from 'ember-pouch';
import { isEmpty } from 'ember-utils';
import { assert } from 'ember-metal/utils';

const { log } = debug;

export default Adapter.extend({

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
    }),

    init() {
        'use strict';

        this._super(...arguments);

        const db = this.createDB();

        this.set('db', db);

        /*
         * If we have specified a remote CouchDB instance, then replicate our local database to it.
         * This is just an example for now.
        */
        if (config.remote_couch) {
            const remoteDb = this.createRemoteDB(db, config.remote_couch);

          this.set('remoteDb', remoteDb);
        }

        return this;
    },

    createDB() {
        'use strict';

        const localDb = config.localCouch || 'moodTracker';

        assert('localCouch must be set', !isEmpty(localDb));

        let db = new PouchDB(localDb);

        return db;
    },

    createRemoteDB(db, remoteCouch) {
        'use strict';

        let remoteDb = new PouchDB(remoteCouch, { ajax: { timeout: 20000 } });

        const replicationOptions = {
          live: true,
          retry: true
        };

        db.replicate.from(remoteDb, replicationOptions).on('paused', (err) => {
            // Connection goes offline/online
            log(err);
        });

        db.replicate.to(remoteDb, replicationOptions).on('denied', (err) => {
          if (!err.id.startsWith('_design/')) {

            // There was an error pushing, probably logged out
            this.get('session').invalidate();

            // Prevent doc from being marked replicated
            throw ({ message: 'Replication failed. Check login?' });
          }
        }).on('paused', (err) => {
            // Connection goes offline/online
            log(err);
        }).on('error', () => {
          this.get('session').invalidate();
        });

        return remoteDb;
    }

});
