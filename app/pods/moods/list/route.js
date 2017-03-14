import Route from 'ember-route';
import RSVP from 'rsvp';
import ResetScrollMixin from '../../../mixins/reset-scroll';

export default Route.extend(ResetScrollMixin, {

    model() {
        'use strict';

        return RSVP.hash({
            moodList: this.store.peekAll('mood')
        });
    }

});
