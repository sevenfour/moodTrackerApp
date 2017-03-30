import Route from 'ember-route';
import RSVP from 'rsvp';
import service from 'ember-service/inject';
import set from 'ember-metal/set';
import computed from 'ember-computed';
import { alias } from 'ember-computed';
import fetch from 'ember-network/fetch';
import debug from 'ember-debug';
import { typeOf } from 'ember-utils';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { task, all } from 'ember-concurrency';

const { log } = debug;

export default Route.extend(ApplicationRouteMixin, {

    session: service(),

    fastboot: service(),

    triggers: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 }
    ],

    routeAfterAuthentication: 'my-starling',

    isAuthenticated: alias('session.isAuthenticated'),

    moodsURL: computed(function() {
        'use strict';

        let moodsURL = this.get('store').adapterFor('mood').get('namespace');

        if (!/moods/.test(moodsURL)) {
            moodsURL += '/moods';
        }

        return moodsURL;
    }),

    model(params, transition) {
        'use strict';

        let user = null;
        let config = null;
        let moods = null;

        if (this.get('isAuthenticated')) {
            const store = this.get('store');
            const token = this.get('session.data.authenticated.token');

            const configNamespace = store.adapterFor('config').get('namespace');

            const userURL = store.adapterFor('user').get('namespace');  // same as user namespace
            const configURL = `${configNamespace}/configs/id`;

            user = this.getUser(transition, userURL, token)
                .then((result) => {
                    return this.createUserRecord(result, result.locale, store);
                });
            config = this.getConfig(transition, configURL, token, store)
                .then((result) => {
                    return this.createConfigRecord(result, store);
                });
            moods = this.getMoods()
                .then((result) => {
                    if (result && result.rows.length > 0) {
                        return this.createMoodRecords(result.rows, store);
                    }
                });
        }

        return RSVP.hash({
            user,
            config,
            moods,
            isSyncing: this.get('syncMoods')
        });
    },

    afterModel(model) {
        'use strict';

        if (this.get('isAuthenticated') && model) {
            const userLang = model.user.get('locale.language');

            if (userLang) {
                this.set('i18n.locale', userLang);
            }
        }
    },

    // Sets document's title (fastboot provided)
    title() {
        'use strict';

        return this.get('i18n').t('document.title');
    },

    activate() {
        'use strict';

        const db = this.get('store').adapterFor('application').get('db');

        let changes = db.changes({
            since: 'now',
            live: true,
            include_docs: true,    // eslint-disable-line camelcase
            returnDocs: false,
            filter(doc) {
                return !doc.isSynced;
            }
        }).on('change', (change) => {
            this.get('processDBChange').perform(change);
        }).on('error', (err) => {
            this.processDBErr(err);
        });

        this.set('changes', changes);
    },

    getUser(transition, userURL, token) {
        'use strict';

        return fetch(userURL, {
            method: 'GET',
            headers: {
              'Authorization': `Basic ${token}`
            }
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 401) {
                    if (transition) {
                        transition.send('logout');
                    } else {
                        this.send('logout');
                    }
                }
            });
    },

    getConfig(transition, configURL, token) {
        'use strict';

        return fetch(configURL, {
            method: 'GET',
            headers: {
              'Authorization': `Basic ${token}`
            }
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 401) {
                  if (transition) {
                      transition.send('logout');
                  } else {
                      this.send('logout');
                  }
                }
            });
    },

    getMoods() {
        'use strict';

        const db = this.store.adapterFor('application').get('db');

        if (db) {
            return db.allDocs({
                startkey: 'mood_',
                endkey: 'mood_\uffff',
                include_docs: true    // eslint-disable-line camelcase
            });
        }
    },
 
    getUnsyncedMoods() {
        'use strict';

        return this.store.query('mood', {
            filter: { isSynced: false }
        });
    },

    fetchMoods(moodsURL, token) {
        'use strict';

        return fetch(moodsURL, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${token}`
            }
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    this.send('logout');
                }
            });
    },

    postMood(moodsURL, moodHash, token) {
        'use strict';

        return fetch(moodsURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Basic ${token}`
            },
            body: JSON.stringify(moodHash)
        })
        .then((response) => {
            return response;
        })
        .catch((reason) => {
            return reason;
        });
    },

    createUserRecord(userObj, localeObj, store) {
        'use strict';

        let user = store.createRecord('user', userObj);
        let locale = store.createRecord('locale', localeObj);

        user.set('locale', locale);

        return user;
    },

    createConfigRecord(configObj, store) {
        'use strict';

        let config = store.createRecord('config', {
            id: configObj.id,
            code: configObj.code
        });

        configObj.stressorTypes.forEach((stressorObj) => {
            store.createRecord('stressor', stressorObj);
        });

        this.get('triggers').forEach((triggerObj) => {
            store.createRecord('trigger', triggerObj);
        });

        config.set('stressorTypes', store.peekAll('stressor'));
        config.set('triggerTypes', store.peekAll('trigger'));

        return config;
    },

    createMoodRecords(moodObjects, store) {
        'use strict';

        const areObjectsFromPouch = moodObjects.any((obj) => {
            return obj.doc;
        });

        let moodsArray;

        if (areObjectsFromPouch) {
            // moodObjects came from PouchDB
            moodsArray = moodObjects.map((obj) => {
                if (obj.doc) {
                    obj.doc.id = obj.doc._id.replace(/\w+_/, '');
                    return obj.doc;
                }
            });
        }

        const moodRecords = {
            'moods': moodsArray || moodObjects
        };

        store.pushPayload('mood', moodRecords);

        return store.peekAll('mood');
    },

    saveMoodsIntoDB(moods) {
        'use strict';

        const store = this.get('store');
        const db = store.adapterFor('application').get('db');

        if (db) {
            const modifiedMoods = moods.map((mood) => {
                mood._id = `mood_${mood.id}`;
                mood.moodTimeInMillisec = new Date(mood.moodTime).getTime();
                mood.isSynced = true;
                return mood;
            });

            db.bulkDocs(modifiedMoods);
        }

        this.createMoodRecords(moods, store);
    },

    processDBErr(err) {
        'use strict';

        log(err);
    },

    destroyDB() {
        'use strict';

        const db = this.get('store').adapterFor('application').get('db');

        return db.destroy();
    },

    unsubscribeDBChanges() {
        'use strict';

        const changes = this.get('changes');

        if (changes) {
            changes.cancel();
        }
    },

    invalidateSession() {
        'use strict';

        this.get('session').invalidate();
    },

    destroyDBAndInvalidate() {
        'use strict';

        this.unsubscribeDBChanges();

        this.destroyDB()
            .then(({ ok }) => {
                if (ok) {
                    this.invalidateSession();
                }
            })
            .catch((err) => {
                log(err);
            });
    },

    saveMoodsData(moods) {
        'use strict';

        const moodsURL = this.get('moodsURL');
        const token = this.get('session.data.authenticated.token');

        return moods.map((mood) => {
            // Check if mood is an instance of an Ember Data class
            if (typeOf(mood) === 'instance') {
                mood = mood.serialize();

                // Remove non-persistent attributes specific for instance
                delete mood.id;
                delete mood.rev;

                const stressors = mood.stressors;

                if (stressors.length > 0) {
                    mood.stressors = stressors.map((stressor) => {
                        return stressor.id;
                    });
                }
            }

            // Remove non-persistent attributes
            delete mood.isSynced;
            delete mood.moodTimeInMillisec;

            return this.postMood(moodsURL, mood, token);
        });
    },

    checkInternetConnection() {
        'use strict';

        const token = this.get('session.data.authenticated.token');

        return fetch('mobile/', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${token}`
            }
            })
            .then((response) => {
                if (response.ok) {
                    return { ok: true };
                } else {
                    return response.json();
                }
            })
            .catch(() => {
                return { ok: false };
            });
    },

    reloadRoute() {
        'use strict';

        window.location.reload();
    },

    processDBChange: task(function* (change) {
        'use strict';

        const store = this.get('store');
        const db = this.get('store').adapterFor('application').get('db');
        const { _id, _rev, data } = change.doc;

        // Strip unnecessary metadata
        const moodId = _id.replace(/\w+_/, '');

        // Just to double check
        if (data && !data.isSynced) {
            yield all(this.saveMoodsData([data]))
                .then((responses) => {
                    if (responses[0].ok) {
                        // Update Ember Data
                        store.peekRecord('mood', moodId).set('isSynced', true);

                        // Update PouchDB
                        db.put({
                            _id,
                            _rev,
                            isSynced: true
                        });
                    }
                });
        }
    }).drop(),

    syncMoods: task(function* (moods) {
        'use strict';

        const store = this.get('store');
        const db = this.get('store').adapterFor('application').get('db');
        const responses = yield all(this.saveMoodsData(moods));

        responses.forEach((response) => {
            if (response.ok) {
              response.json().then((result) => {

                  store.queryRecord('mood', {
                      filter: { moodTimeInMillisec: result.moodTime }
                  }).then((mood) => {
                      // Update Ember Data
                      mood.set('isSynced', true);

                      // TODO: refactor the following hacky logic
                      /*
                       * Since ember-pouch is based on relational-pouch,
                       * the id is a combination of record name plus number representing
                       * data type.
                       * Use '2' because record name is of type String as per rel-pouch specs.
                      */
                      const _id = `mood_2_${mood.get('id')}`;
                      const _rev = mood.get('rev');

                      // Update PouchDB
                      db.put({
                          _id,
                          _rev,
                          isSynced: true
                      });
                  });
              });
            }
        });
    }).drop(),

    saveMoodsAndInvalidateTask: task(function* (moods) {
        'use strict';

        yield all(this.saveMoodsData(moods))
            .then((responses) => {
                const isAnyFailed = responses.any((response) => {
                    return !response.ok;
                });

                if (isAnyFailed) {
                    // An error occured saving data
                    this.controllerFor('application').set('errorMessage',
                        'serverError.runtime.error');

                    this.controllerFor(this.routeName).set('isSaving', false);

                    // TODO: analyze response and implement logic for handling failed fetch
                } else {
                    this.destroyDBAndInvalidate();
                }
            });
    }).drop(),

    actions: {

        // invoked when user selects an item to add to a list
        addItem(issue, list) {
            'use strict';

            if (list.includes(issue)) {
                // remove issue
                list.removeObject(issue);
            } else {
                // add issue
                list.addObject(issue);
            }
        },

        sync() {
            'use strict';

            // Check Internet connection
            this.checkInternetConnection()
                .then((response) => {
                    if (response.ok) {
                        // There is an Internet connection
                        this.getUnsyncedMoods().then((moods) => {
                            if (moods.get('length') === 0) {
                                // All records have been synced
                                log('All moods have been synced.');
                            } else {
                                // Perform syncing
                                this.get('syncMoods').perform(moods);
                            }
                        });
                    } else if (!response.ok) {
                        this.controllerFor('application').set('errorMessage',
                            'serverError.noInternetConnection');
                    }
                });
        },

        switchLanguage() {
            'use strict';

            const token = this.get('session.data.authenticated.token');
            const localeURL = this.get('store').adapterFor('locale').get('namespace');

            let locale = this.modelFor(this.routeName).user.get('locale');

            if (this.get('i18n.locale') === 'fr') {
                locale.set('language', 'en');
            } else {
                locale.set('language', 'fr');
            }

            let localeHash = locale.serialize();

            // i18n.locale will be set in afterModel after the refresh
            fetch(localeURL, {
                method: 'PUT',
                headers: {
                    'data-type': 'json',
                    'content-type': 'application/json',
                    'Authorization': `Basic ${token}`
                },
                body: JSON.stringify(localeHash)
                })
                .then((response) => {
                    if (response.ok) {
                        this.reloadRoute();
                    }
                })
                .catch(() => {
                      /* NOTE: since locale.save() would fail without a server,
                       * refresh the view anyway
                      */
                      this.reloadRoute();
                });
        },

        authenticate(credentials) {
            'use strict';

            const store = this.get('store');
            const token = this.get('session.data.authenticated.token');

            const configNamespace = store.adapterFor('config').get('namespace');

            const userURL = store.adapterFor('user').get('namespace');  // same as user namespace
            const configURL = `${configNamespace}/configs/id`;

            const moodsURL = this.get('moodsURL');

            return new RSVP.Promise((resolve, reject) => {
                this.get('session').authenticate('authenticator:custom', credentials)
                    .then(() => {
                        return this.getUser(null, userURL, token);
                    })
                    .then((result) => {
                        const user = this.createUserRecord(result, result.locale, store);

                        set(this.currentModel, 'user', user);

                        return this.getConfig(null, configURL, token);
                    })
                    .then((result) => {
                        const config = this.createConfigRecord(result, store);

                        set(this.currentModel, 'config', config);

                        return this.fetchMoods(moodsURL, token);
                    })
                    .then((moods) => {
                        // Load moods into PouchDB
                        this.saveMoodsIntoDB(moods);
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
            });
        },

        logout() {
            'use strict';

            this.getUnsyncedMoods().then((moods) => {
                if (moods.get('length') === 0) {
                    // All records have been synced; proceed with logout
                    this.destroyDBAndInvalidate();
                } else {
                    // Notify the data sync has began
                    this.controllerFor(this.routeName).set('isSaving', true);

                    // Sync records first; then, proceed with logout
                    this.get('saveMoodsAndInvalidateTask').perform(moods);
                }
            });
        },

        error(error, transition) {
            'use strict';

            this._super(...arguments);

            // handle the error
            // eslint-disable-next-line no-console
            console.log(`${error.message} in transition to "${transition.targetName}"`); // NOSONAR
            // eslint-disable-next-line no-console
            console.log(`${error.stack}`); // NOSONAR

            return true;
        }
    }
});
