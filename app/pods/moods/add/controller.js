import Controller from 'ember-controller';
import computed from 'ember-computed';
import { alias, equal, or, empty } from 'ember-computed';
import { countChars } from '../../../utils/strings';
import { getDate } from '../../../utils/dates';

export default Controller.extend({

    // mood related properties
    mood: {
        date: '',
        time: ''
    },

    isTriggersListOpen: false,

    isStressorsListOpen: false,

    BEHAVIOUR_MAX_CHARS: 2048,

    moods: [
        {
            emotion: 'sadness',
            low: 'sad',
            high: 'happy'
        },
        {
            emotion: 'anxiety',
            low: 'anxious',
            high: 'relaxed'
        },
        {
            emotion: 'worry',
            low: 'worried',
            high: 'calm'
        }
    ],

    error: {
        behaviour: null,
        server: null
    },

    timeDiff: 30,    // 30 minutes time limit for next mood time entries

    selectedStressors: alias('model.mood.stressors'),

    isMoodDateEmpty: empty('mood.date'),

    isMoodTimeEmpty: empty('mood.time'),

    isBehaviourEmpty: equal('behaviourCharsCount', 0),

    isMoodInFuture: computed('moodDateTimeUTC', function() {
        'use strict';

        return new Date(`${this.get('moodDateTimeUTC')}`) > new Date().getTime();
    }),

    behaviourCharsCount: computed('model.mood.behaviour', function() {
        'use strict';

        return parseInt(countChars(this.model.mood.get('behaviour')), 10);
    }),

    isBehaviourMaxCharsExceeded: computed('behaviourCharsCount', function() {
        'use strict';

        return this.get('behaviourCharsCount') > this.get('BEHAVIOUR_MAX_CHARS');
    }),

    isBehaviourNotValid: or('isBehaviourEmpty', 'isBehaviourMaxCharsExceeded'),

    showBehaviourError: computed('isBehaviourMaxCharsExceeded', function() {
        'use strict';

        let showBehaviourError = false;

        if (this.get('isBehaviourMaxCharsExceeded')) {
            this.set('error.behaviour', 'moodTracker.error.charCountExceeds');

            showBehaviourError = true;
        } else {
            this.set('error.behaviour', '');
        }

        return showBehaviourError;
    }),

    showMoodDateTimeError: computed('isMoodInFuture', function() {
        'use strict';

        let showMoodDateTimeError = false;

        if (this.get('isMoodInFuture')) {
            this.set('error.moodDateTime', 'moodTracker.error.moodInFuture');

            showMoodDateTimeError = true;
        } else {
            this.set('error.moodDateTime', '');
        }

        return showMoodDateTimeError;
    }),

    timeDefault: computed(function() {
        'use strict';

        return new Date(new Date().setMinutes(
            new Date().getMinutes() - this.get('timeDiff')));
    }),

    moodDateTimeUTC: computed('mood.date', 'mood.time', function() {
        'use strict';

        const date = this.get('mood.date');
        const time = this.get('mood.time');

        return date && time ? getDate(date, time) : undefined;
    }),

    isSavedDisabled: or('isMoodDateEmpty', 'isMoodTimeEmpty', 'isMoodInFuture',
        'isBehaviourNotValid')

});
