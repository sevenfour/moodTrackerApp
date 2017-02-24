import Component from 'ember-component';
import computed from 'ember-computed';
import { formatShort } from '../../../utils/dates';
import { scheduleOnce } from 'ember-runloop';

// You must specify a function to handle the 'onSet' action to set the date value because setting the value directly
// from the component doesn't seem to work.

export default Component.extend({

    type: 'text',

    tagName: 'input',

    format: 'dddd, mmmm d, yyyy',

    selectYears: true,

    selectMonths: true,

    date: null,

    datePickerContainer: '',

    initialLocale: '',

    attributeBindings: [ 'type', 'value' ],

    value: computed('date', function() {
        'use strict';

        const date = this.get('date');

        if (date) {
            return formatShort(date);
        } else {
            return '';
        }
    }),

    picker: computed(function() {
        'use strict';

        return this.$().pickadate().pickadate('picker');
    }),

    defaults: computed('locale', function() {
        'use strict';

        const i18n = this.get('i18n');

        return {
            monthsFull: i18n.t('monthsFull'),
            monthsShort: i18n.t('monthsShort'),
            weekdaysFull: i18n.t('weekdaysFull'),
            weekdaysShort: i18n.t('weekdaysShort'),
            today: i18n.t('pickadate.today'),
            clear: i18n.t('pickadate.clear'),
            close: i18n.t('pickadate.close'),
            labelMonthNext: i18n.t('pickadate.labelMonthNext'),
            labelMonthPrev: i18n.t('pickadate.labelMonthPrev'),
            labelMonthSelect: i18n.t('pickadate.labelMonthSelect'),
            labelYearSelect: i18n.t('pickadate.labelYearSelect')
        };
    }),

    setupComponent() {
        'use strict';

        const self = this;
        const defaults = self.get('defaults');

        self.$().pickadate({
            // Set the defaults
            monthsFull: defaults.monthsFull,
            monthsShort: defaults.monthsShort,
            weekdaysFull: defaults.weekdaysFull,
            weekdaysShort: defaults.weekdaysShort,
            today: defaults.today,
            clear: defaults.clear,
            close: defaults.close,
            labelMonthNext: defaults.labelMonthNext,
            labelMonthPrev: defaults.labelMonthPrev,
            labelMonthSelect: defaults.labelMonthSelect,
            labelYearSelect: defaults.labelYearSelect,

            format: self.get('format'),
            showMonthsShort: true,
            selectMonths: JSON.parse(self.get('selectMonths')),
            selectYears: JSON.parse(self.get('selectYears')),
            container: self.get('datePickerContainer'),
            formatSubmit: 'yyyy/mm/dd',
            min: ((typeof self.get('min') !== 'undefined')
                ? self.get('min') : new Date(parseInt(new Date().getFullYear(), 10) - 100, 1, 1)),
            max: ((typeof self.get('max') !== 'undefined') ? self.get('max') : Date.now()),

            onSet() {
                self.sendAction('onSet', this.get('select'));
            }
        });
    },

    didInsertElement() {
        'use strict';

        scheduleOnce('afterRender', this, function() {
            // Set the initial locale
            this.set('initialLocale', this.get('locale'));

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

            // Rerender pickadate
            picker.render(true);
        }
    }
});
