import Component from 'ember-component';
import computed from 'ember-computed';
import { checkFirstName } from '../../../utils/strings';

export default Component.extend({

    tagName: 'nav',

    classNames: ['drawer-menu'],

    languageLink: computed('i18n.locale', function() {
        'use strict';

        if (this.get('i18n.locale') === 'fr') {
            return 'English';
        } else {
            return 'Français';
        }
    }),

    headerFirstName: computed('firstName', function() {
        'use strict';

        return checkFirstName(this.get('firstName'));
    }),

    actions: {

        sync() {
            'use strict';

            this.sync();
        },

        switchLanguage() {
            'use strict';

            this.switchLanguage();
        },

        logout() {
            'use strict';

            this.logout();
        }

    }

});
