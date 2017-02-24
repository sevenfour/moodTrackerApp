import $ from 'jquery';
import Route from 'ember-route';
import RSVP from 'rsvp';
import { next, schedule } from 'ember-runloop';
import ResetScrollMixin from '../../../mixins/reset-scroll';

export default Route.extend(ResetScrollMixin, {

    model() {
        'use strict';

        return RSVP.hash({
            config: {},
            mood: this.store.createRecord('mood')
        });
    },

    deactivate() {
        'use strict';

        this.modelFor(this.routeName).mood.rollbackAttributes();
    },

    setCurrentDateTime(datePicker, timePicker) {
        'use strict';

        const controller =  this.controllerFor('moods.add');

        datePicker.set('select', new Date());
        timePicker.set('select', controller.get('timeDefault'));
    },

    actions: {

        moodValueSet(emotion, value) {
            'use strict';

            this.modelFor(this.routeName).mood.set(`${emotion}`, value);
        },

        toggleList(listName) {
            'use strict';

            if (listName === 'triggers') {
                if (this.controller.get('isStressorsListOpen')) {
                    this.controller.toggleProperty('isStressorsListOpen');
                }
                this.controller.toggleProperty('isTriggersListOpen');
            } else if (listName === 'stressors') {
              if (this.controller.get('isTriggersListOpen')) {
                  this.controller.toggleProperty('isTriggersListOpen');
              }
                this.controller.toggleProperty('isStressorsListOpen');
            }
        },

        setMoodDate(date) {
            'use strict';

            this.controllerFor('moods.add').set('mood.date', date ? date.obj : '');
        },

        didTransition() {
            'use strict';

            schedule('afterRender', () => {
                /*
                * If this is moods.add, default date- and time-pickers to current date/time
                */
                if (!this.modelFor(this.routeName).mood.get('moodTime')) {
                    /*
                     * Access picker in the next run loop to make sure
                     * pickadate and pickatime are available.
                    */
                    next(()=> {
                        const datePicker = $('.date').pickadate('picker');
                        const timePicker = $('.time').pickatime('picker');

                        // Default to current date and time
                        this.setCurrentDateTime(datePicker, timePicker);
                    });
                }
            });
        }

    }

});
