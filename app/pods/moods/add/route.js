import $ from 'jquery';
import Route from 'ember-route';
import RSVP from 'rsvp';
import set from 'ember-metal/set';
import { next, schedule } from 'ember-runloop';
import ResetScrollMixin from '../../../mixins/reset-scroll';
import { clearObject } from '../../../utils/utility-functions';

export default Route.extend(ResetScrollMixin, {

    model() {
        'use strict';

        return RSVP.hash({
            user: this.modelFor('application').user,
            config: this.modelFor('application').config,
            mood: this.store.createRecord('mood')
        });
    },

    afterModel(model) {
        'use strict';

        const moodTime = model.mood.get('moodTime');
        const controller = this.controllerFor('moods.add');

        if (moodTime) {
            controller.set('mood.date', moodTime);
            controller.set('mood.time', `${moodTime.getHours()}:${moodTime.getMinutes()}`);
        } else {
            // Reset mood data
            clearObject(controller.get('mood'));
        }
    },

    resetController(controller) {
        'use strict';

        // Reset error states
        clearObject(controller.get('error'));
    },

    deactivate() {
        'use strict';

        const controller = this.controllerFor('moods.add');

        // Reset error states
        clearObject(controller.get('error'));

        this.modelFor(this.routeName).mood.rollbackAttributes();
    },

    setCurrentDateTime(datePicker, timePicker) {
        'use strict';

        const controller =  this.controllerFor('moods.add');

        datePicker.set('select', new Date());
        timePicker.set('select', controller.get('timeDefault'));
    },

    clearMoodValue() {
        'use strict';

        this.clearRadio('.mood-value-radio');
    },

    clearMoodTrigger() {
        'use strict';

        this.clearRadio('.trigger-radio');
    },

    clearRadio(radioClass) {
        'use strict';

        let radio = [...document.querySelectorAll(`${radioClass}`)].find((radio) => {
            return radio.checked;
        });

        if (radio) {
            radio.checked = false;
        }
    },

    getMoodByMoodTime(moodTime) {
        'use strict';

        const db = this.store.adapterFor('application').get('db');

        if (db) {
            return db.find({
                selector: {
                    moodTime: {
                        $eq: moodTime
                    }
                }
            });
        }
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

        triggerChanged(event) {
            'use strict';

            let trigger = event.srcElement.innerText;

            if (trigger) {
                // If trigger consists of two or more words, replace space with an underscore
                trigger = trigger.replace(' ', '_').toUpperCase();

                this.modelFor(this.routeName).mood.set('moodTrigger', trigger);
            }
        },

        setMoodDate(date) {
            'use strict';

            this.controllerFor('moods.add').set('mood.date', date ? date.obj : '');
        },

        saveMood() {
            'use strict';

            const moodRecord = this.modelFor(this.routeName).mood;

            moodRecord.set('moodTime', this.controllerFor('moods.add').get('moodDateTimeUTC'));

            // Just to make sure, since isSynced: false by default
            moodRecord.set('isSynced', false);

            const moodTime = new Date(moodRecord.get('moodTime')).getTime();

            this.getMoodByMoodTime(moodTime)
                .then((result) => {
                    if (result && result.docs.length > 0) {
                        // Duplicate mood timestamp
                        this.controllerFor('application').set('errorMessage',
                            'moodTracker.error.duplicateMood');
                    } else {
                        moodRecord.save()
                            .then(() => {
                                this.controllerFor('application').set('errorMessage', null);
                                this.controllerFor('application').set('successMessage',
                                    'moodTracker.success.goodWork');

                                this.send('trackAnotherMood');
                            }, (reason) => {
                                // Failure callback
                                if (reason) {
                                    this.controllerFor('application').set('errorMessage',
                                        'serverError.runtime.error');
                                }
                            });
                    }
                });
        },

        trackAnotherMood() {
            'use strict';

            const controller = this.controllerFor('moods.add');

            // Clear mood value selection
            controller.get('moods').forEach(() => {
                this.clearMoodValue();
            });

            // Clear mood trigger selection
            this.clearMoodTrigger();

            // Default to current date and time
            this.setCurrentDateTime(this.get('datePicker'), this.get('timePicker'));

            if (this.routeName === 'moods.add') {
                // Create new mood record
                set(this.modelFor(this.routeName), 'mood', this.store.createRecord('mood'));
            } else {
                this.transitionTo('moods.add');
            }
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

                        this.set('datePicker', datePicker);
                        this.set('timePicker', timePicker);

                        // Default to current date and time
                        this.setCurrentDateTime(datePicker, timePicker);
                    });
                }
            });
        }

    }

});
