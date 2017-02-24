import Component from 'ember-component';
import computed from 'ember-computed';

export default Component.extend({

    classNames: ['mood-value-input'],

    moodMinValue: -5,

    moodMaxValue: 5,

    moodValueArr: [],

    moodLowLabel: computed('mood.low', function() {
        'use strict';

        const i18n = this.get('i18n');

        return i18n.t(`emotions.${this.get('mood.low')}`);
    }),

    moodHighLabel: computed('mood.high', function() {
        'use strict';

        const i18n = this.get('i18n');

        return i18n.t(`emotions.${this.get('mood.high')}`);
    }),

    init() {
        'use strict';

        this._super(...arguments);

        const minValue = this.get('moodMinValue');
        const maxValue = this.get('moodMaxValue');

        const moodValueArr = [...Array(11).keys()].map((value) => {
            let moodValue = value < 6
                ? (value - maxValue) : (value + minValue);

            return {
                value: moodValue
            };
        });

        this.set('moodValueArr', moodValueArr);
    },

    actions: {

        moodValueChanged(emotion, value) {
            'use strict';

            this.moodValueChanged(emotion, value);
        }

    }

});
