import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({

    authorize(sessionData, block) {
        'use strict';

        const { token } = sessionData;

        if (this.get('session.isAuthenticated') && token) {
            block('Authorization', `Basic ${token}`);
        }
    }

});
