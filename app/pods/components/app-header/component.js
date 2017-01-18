import Component from 'ember-component';
import computed from 'ember-computed';
import { checkFirstName } from '../../../utils/strings';

export default Component.extend({

    tagName: 'header',

    classNames: ['app-header'],

    currentPath: '',

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

        switchLanguage() {
            'use strict';

            this.sendAction('switchLanguage');
        },

        logout() {
            'use strict';

            this.sendAction('logout');
        }

    }
});
