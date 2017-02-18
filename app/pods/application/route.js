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

    language: 'default',

    routeAfterAuthentication: 'my-starling',

    isAuthenticated: alias('session.isAuthenticated'),

    model(params, transition) {
        'use strict';

        let user = null;

        if (this.get('isAuthenticated')) {
            return fetch('/api/users/id', {
                method: 'GET',
                headers: {
                  'Authorization': `Basic ${this.get('session.data.authenticated.token')}`
                }
                })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else if (response.status === 403) {
                        transition.send('invalidateSession');
                    }
                })
                .then((result) => {
                    user = result;
                });
        }

        return RSVP.hash({
            user
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

  saveUserData(data) {
      'use strict';

      const promises = this.store.peekAll(data).filterBy('hasDirtyAttributes').map((datum) => {
          return datum.save();
      });

      return RSVP.all(promises);
  },

  actions: {

      switchLanguage() {
          'use strict';

          const locale = this.modelFor(this.routeName).user.get('locale');

          if (this.get('i18n.locale') === 'fr') {
              locale.set('language', 'en');
          } else {
              locale.set('language', 'fr');
          }

          this.language = locale.get('language');
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

          return new RSVP.Promise((resolve, reject) => {
              this.get('session').authenticate('authenticator:custom', credentials)
                  .then(() => {
                      let user = this.get('session.data.authenticated.user');

                      this.get('store').createRecord('user', user);

                      set(this.currentModel, 'user', user);
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
