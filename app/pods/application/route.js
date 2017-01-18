import Route from 'ember-route';
import Object from 'ember-object';
import RSVP from 'rsvp';

export default Route.extend({

    language: 'default',

    model() {
        'use strict';

        return RSVP.hash({
            user: Object.create({
                firstName: 'Salomon',
                lastName: 'Salomonder',
                email: 'salomonder@g.com',
                nickname: '123',
                locale: Object.create({
                    language: 'en',
                    region: null
                })
            }),
            language: this.language
        });
    },

  afterModel(model) {
      'use strict';

      const userLang = model.user.get('locale.language');

      if (userLang) {
          this.set('i18n.locale', userLang);
      }

      document.title = this.get('i18n').t('document.title');
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

      error(error, transition) {
          'use strict';
          // handle the error
          // eslint-disable-next-line no-console
          console.log(`${error.message} in transition to "${transition.targetName}"`); // NOSONAR
          // eslint-disable-next-line no-console
          console.log(error.stack); // NOSONAR

          return true;
      },

      /*
      * This is the wrapper function to perform various app logic
      * before the actual logout.
      */
      doLogout() {
          'use strict';

          this.send('logout');
      },

      logout() {
          'use strict';

          window.location = '/';
      }
  }
});
