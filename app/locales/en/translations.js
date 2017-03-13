export default {
    'document.title': 'Starling is here for you.',

    'symptomsCategory': {
        'worry': 'Worry',
        'anxiety': 'Anxiety',
        'sadness': 'Sadness'
    },

    'emotions': {
        'happy': 'Happy',
        'sad': 'Sad',
        'relaxed': 'Relaxed',
        'anxious': 'Anxious',
        'calm': 'Calm',
        'worried': 'Worried'
    },

    'moods': {
        'sadness': 'Sad-Happy',
        'anxiety': 'Anxious-Relaxed',
        'worry': 'Worried-Calm'
    },

    'stressor': {
        '1': 'Work',
        '2': 'Relationships',
        '3': 'Child Issues/Care',
        '4': 'Parent Issues/Care',
        '5': 'Colleague',
        '6': 'Finances',
        '7': 'Bereavement',
        '8': 'Health',
        '9': 'Retirement',
        '10': 'Legal',
        '11': 'Household',
        '12': 'Family',
        '13': 'Other',
        '14': 'Body Image',
        '15': 'Commute',
        '16': 'Travel'
    },

    'trigger': {
        '1': 'Situation',
        '2': 'Thought',
        '3': 'Feeling',
        '4': 'Behaviour',
        '5': 'Sensation',
        '6': 'Not sure'
    },

    'serverError': {
        'unauthorized': 'Sign in details are not correct. Please try again.',
        'runtime.error': 'There was a problem processing your request. Please try again later.'
    },

    'miscellaneous': {
        'characters': 'characters'
    },

    /* Buttons - START - ------------------------------------------------------------------------ */

    'btns': {
        'login': 'Login',
        'dismiss': 'Dismiss',
        'reload': 'Reload',
        'save': 'Save',
        'back': 'Back',
        'track': 'Track',
        'ok': 'OK'
    },

    /* Buttons - END - -------------------------------------------------------------------------- */

    /* Routes names - START - ------------------------------------------------------------------- */

    'routes': {
        'moodTracker': 'Mood Tracker',
        'moodHistory': 'Mood History'
    },

    /* Routes names - END - --------------------------------------------------------------------- */

    /* Components - START - --------------------------------------------------------------------- */

    'drawerMenu': {
        'toggleNav': 'Toggle navigation',
        'starlingID': 'Starling ID',
        'member': 'Member',
        'logout': 'Log Out'
    },

    /* Components - END - ----------------------------------------------------------------------- */

    /* Pages - START - -------------------------------------------------------------------------- */

    /* Login page - START - --------------------------------------------------------------------- */

    'login': {
        'emailTitle': 'Email',
        'passwordTitle': 'Password'
    },

    /* Login page - END - ----------------------------------------------------------------------- */

    /* My Starling page - START - --------------------------------------------------------------- */

    'myStarling': {
        'title': 'What would you like to do?',
        'linkToMoodTracker': 'Track a mood',
        'linkToMoodHistory': 'Examine your history'
    },

    /* My Starling page - END - ----------------------------------------------------------------- */

    /* Mood Tracker page - START - -------------------------------------------------------------- */

    'moodTracker': {
        'emotionsTitle': 'How did you feel?',
        'behaviourTitle': 'What happened?',
        'behaviourPlaceholder': 'Describe the situation here...',
        'triggers': 'Triggers',
        'stressors': 'Stressors',
        'toggle': {
            'triggers': 'Toggle triggers list',
            'stressors': 'Toggle stressors list'
        },
        'noTriggersTitle': 'Sorry, no triggers are present.',
        'noStressorsTitle': 'Sorry, no stressors are present.',
        'success': {
            'goodWork': 'Good work on tracking your mood!'
        },
        'error': {
            'charCountExceeds': 'Sorry, the maximum amount of characters allowed is {{MAX_CHARS}}.',
            'moodInFuture': 'Sorry, you cannot track moods in the future.',
            'duplicateMood': 'Sorry, you have already entered a mood for this date and time.',
            'server': `There was an unexpected error on the server.
                Please try to save your mood again.`
        }
    },

    /* Mood Tracker page - END - ---------------------------------------------------------------- */

    /* Mood History page - START - -------------------------------------------------------------- */

    'moodHistory': {
        'title': 'Great job'
    },

    /* Mood History page - END - ---------------------------------------------------------------- */

    /* Pages - END - ---------------------------------------------------------------------------- */

    /* Dates related - START - ------------------------------------------------------------------ */

    'monthsFull': () => {
        'use strict';

        return [ 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December' ];
    },
    'monthsShort': () => {
        'use strict';

        return [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    },
    'weekdaysFull': () => {
        'use strict';

        return [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    },
    'weekdaysShort': () => {
        'use strict';

        return [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
    },

    /* Dates related - END - -------------------------------------------------------------------- */

    /* jQuery libraries - START - --------------------------------------------------------------- */

    'pickadate': {
        // Buttons
        'today': 'Today',
        'clear': 'Clear',
        'close': 'Close',

        // Accessibility labels
        'labelMonthNext': 'Next month',
        'labelMonthPrev': 'Previous month',
        'labelMonthSelect': 'Select a month',
        'labelYearSelect': 'Select a year'
    },

    'pickatime': {
        // Clear button
        'clear': 'Clear'
    }

    /* jQuery libraries - END - ----------------------------------------------------------------- */
};
