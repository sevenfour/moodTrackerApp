import Component from 'ember-component';
import service from 'ember-service/inject';
import computed from 'ember-computed';

export default Component.extend({

    session: service(),

    tagName: 'form',

    identification: null,
    identificationSet: null,

    password: null,
    passwordSet: null,

    errorMessage: null,

    isIdentificationNotChanged: computed('identification', 'identificationSet', function() {
        'use strict';

        return this.get('identification') === this.get('identificationSet');
    }),

    isPasswordNotChanged: computed('password', 'passwordSet', function() {
        'use strict';

        return this.get('password') === this.get('passwordSet');
    }),

    showErrorMessage: computed('errorMessage',
        'isIdentificationNotChanged', 'isPasswordNotChanged', function() {
        'use strict';

        const errorMessage = this.get('errorMessage');
        const isIdentificationNotChanged = this.get('isIdentificationNotChanged');
        const isPasswordNotChanged = this.get('isPasswordNotChanged');

        if (errorMessage
            && isIdentificationNotChanged
            && isPasswordNotChanged) {
            return true;
        } else {
            return false;
        }
    }),

    submit(event) {
        'use strict';

        event.preventDefault();

        this.send('authenticate');
    },

    actions: {

        authenticate() {
            'use strict';

            const credentials = this.getProperties('identification', 'password');

            this.set('identificationSet', credentials.identification);
            this.set('passwordSet', credentials.password);

            // Reset error message
            this.set('errorMessage', null);

            this.authenticate(credentials)
                .catch((reason) => {
                    if (reason.status === 401) {
                        this.set('errorMessage', 'serverError.unauthorized');
                    } else {
                        this.set('errorMessage', 'serverError.runtime.error');
                    }
                });
        }

    }

});
