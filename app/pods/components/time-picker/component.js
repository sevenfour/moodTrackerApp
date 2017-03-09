import Component from 'ember-component';
import computed from 'ember-computed';
import { scheduleOnce } from 'ember-runloop';

export default Component.extend({
    type: 'text',

    tagName: 'input',

    timePickerContainer: '',

    value: '',

    initialLocale: '',

    attributeBindings: [ 'value', 'interval', 'max', 'type' ],

    classNameBindings: ['class'],

    picker: computed(function() {
        'use strict';

        return this.$().pickatime().pickatime('picker');
    }),

    defaults: computed('locale', function() {
        'use strict';

        return {
            clear: this.get('i18n').t('pickatime.clear')
        };
    }),

    setupComponent() {
        'use strict';

        const self = this;
        const defaults = this.get('defaults');

        const picker = self.$().pickatime({
            format: 'H:i',
            interval: this.interval,
            max: this.max,
            clear: defaults.clear,
            container: self.get('timePickerContainer'),

            onSet() {
                self.set('value', this.get());
            }
        });

        if (this.value) {
            picker.pickatime('picker').set('select', this.value);
        } else {
            // Set the current time considering the interval
            const date = new Date();
            const offset = date.getHours() * 60 + date.getMinutes() - this.interval;
            picker.pickatime('picker').set('highlight', offset);
        }
    },

    didInsertElement() {
        'use strict';

        this._super(...arguments);

        scheduleOnce('afterRender', this, function() {
            this.setupComponent();
        });
    },

    didUpdateAttrs() {
        'use strict';

        this._super(...arguments);

        // Rerender the picker only if the locale has been changed
        if (this.get('initialLocale') !== this.get('locale')) {
            this.set('initialLocale', this.get('locale'));

            /*
             * NOTE: Until PR #793 (Defining and changing locale at runtime) is merged into
             * pickadate, or a more optimal solution is found, use the following approach:
             */
            const picker = this.get('picker');
            const defaults = this.get('defaults');

            Object.getOwnPropertyNames(defaults).forEach((prop) => {
                picker.component.settings[prop] = defaults[prop];
            });

            // Rerender pickatime
            picker.render(true);
        }
    }
});
