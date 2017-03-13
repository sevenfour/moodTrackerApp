import Route from 'ember-route';
import RSVP from 'rsvp';

export default Route.extend({

    model() {
        'use strict';

        return RSVP.hash({
            moodList: this.store.peekAll('mood')
        });
    }

});
