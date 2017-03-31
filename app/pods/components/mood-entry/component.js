import Component from 'ember-component';
import computed from 'ember-computed';
import { alias, gt } from 'ember-computed';
import { formatShort, getTime } from '../../../utils/dates';

export default Component.extend({

    classNames: ['mood-entry'],

    date: alias('mood.moodTime'),

    stressors: alias('mood.stressors'),

    areAnyStressors: gt('stressors.length', 0),

    formattedDate: computed('date', function() {
        'use strict';

        return formatShort(this.get('date'));
    }),

    formattedTime: computed('date', function() {
        'use strict';

        return getTime(this.get('date'));
    }),

    moodTrigger: computed('mood.moodTrigger', function() {
        'use strict';

        const moodTrigger = this.get('mood.moodTrigger');

        if (moodTrigger) {
            let [ first, ...rest ] = [...moodTrigger.toLowerCase()];

            return `${first.toUpperCase()}${rest.join('')}`;
        }
    })

});
