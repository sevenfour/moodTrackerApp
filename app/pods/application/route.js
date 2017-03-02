import Route from 'ember-route';
import RSVP from 'rsvp';
import service from 'ember-service/inject';
import set from 'ember-metal/set';
import { alias } from 'ember-computed';
import fetch from 'ember-network/fetch';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

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

    model(params, transition) {
        'use strict';

        let user = null;
        let config = null;

        if (this.get('isAuthenticated')) {
            const store = this.get('store');
            const token = this.get('session.data.authenticated.token');

            const configNamespace = store.adapterFor('config').get('namespace');

            const userURL = store.adapterFor('user').get('namespace');  // same as user namespace
            const configURL = `${configNamespace}/configs/id`;

            user = this.getUser(transition, userURL, token, store)
                .then((user) => {
                    return user;
                });
            config = this.getConfig(transition, configURL, token, store)
                .then((config) => {
                    return config;
                });
        }

        return RSVP.hash({
            user,
            config
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

    getUser(transition, userURL, token, store) {
        'use strict';

        let user = null;
        let locale = null;

        return new RSVP.Promise((resolve) => {
            fetch(userURL, {
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
                            transition.send('invalidateSession');
                        }
                    }
                })
                .then((result) => {
                    user = store.createRecord('user', result);
                    locale = store.createRecord('locale', result.locale);

                    user.set('locale', locale);

                    resolve(user);
                });
        });
    },

    getConfig(transition, configURL, token, store) {
        'use strict';

        let config;

        return new RSVP.Promise((resolve) => {
            fetch(configURL, {
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
                          transition.send('invalidateSession');
                      }
                    }
                })
                .then((result) => {
                    config = store.createRecord('config', {
                        id: result.id,
                        code: result.code
                    });

                    result.stressorTypes.forEach((stressorObj) => {
                        store.createRecord('stressor', stressorObj);
                    });

                    this.get('triggers').forEach((triggerObj) => {
                        store.createRecord('trigger', triggerObj);
                    });

                    config.set('stressorTypes', store.peekAll('stressor'));
                    config.set('triggerTypes', store.peekAll('trigger'));

                    resolve(config);
                });
        });
    },

    saveUserData(data) {
        'use strict';

        const promises = this.store.peekAll(data).filterBy('hasDirtyAttributes').map((datum) => {
            return datum.save();
        });

        return RSVP.all(promises);
    },

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

        switchLanguage() {
            'use strict';

            const locale = this.modelFor(this.routeName).user.get('locale');

            if (this.get('i18n.locale') === 'fr') {
                locale.set('language', 'en');
            } else {
                locale.set('language', 'fr');
            }

            // i18n.locale will be set in afterModel after the refresh
            locale.save().then(() => {
                // force view to re-render (re-fires all the route hooks)
                this.refresh();
            }).catch(() => {
                // NOTE: since locale.save() would fail without a server, refresh the view anyway
                this.refresh();
            });
        },

        authenticate(credentials) {
            'use strict';

            const store = this.get('store');
            const token = this.get('session.data.authenticated.token');

            const configNamespace = store.adapterFor('config').get('namespace');

            const userURL = store.adapterFor('user').get('namespace');  // same as user namespace
            const configURL = `${configNamespace}/configs/id`;

            return new RSVP.Promise((resolve, reject) => {
                this.get('session').authenticate('authenticator:custom', credentials)
                    .then(() => {
                        this.getUser(null, userURL, token, store)
                            .then((user) => {
                                set(this.currentModel, 'user', user);

                                this.getConfig(null, configURL, token, store)
                                    .then((config) => {
                                        set(this.currentModel, 'config', config);

                                        resolve();
                                    });
                            });
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
            });
        },

        invalidateSession() {
            'use strict';

            this.get('session').invalidate();
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
