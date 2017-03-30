import Component from 'ember-component';
import computed from 'ember-computed';
import { not } from 'ember-computed';
import { checkFirstName } from '../../../utils/strings';

export default Component.extend({

    tagName: 'nav',

    classNames: ['drawer-menu'],

    isSyncDisabled: not('isSyncEnabled'),

    headerFirstName: computed('firstName', function() {
        'use strict';

        return checkFirstName(this.get('firstName'));
    }),

    languageLink: computed('i18n.locale', function() {
        'use strict';

        if (this.get('i18n.locale') === 'fr') {
            return 'English';
        } else {
            return 'Français';
        }
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
