export default {
    'document.title': 'Starling est là pour vous.', // *

    'symptomsCategory': {
        'worry': 'L\'inquiétude', // *
        'anxiety': 'L\'anxiété', // *
        'sadness': 'La tristesse' // *
    },

    'emotions': {
        'happy': 'Joyeux', // *
        'sad': 'Triste', // *
        'relaxed': 'Détendu', // *
        'anxious': 'Anxieux', // *
        'calm': 'Calme',
        'worried': 'Inquiet' // *
    },

    'moods': {
        'sadness': 'Triste-Joyeux',
        'anxiety': 'Anxieux-Détendu',
        'worry': 'Inquiet-Calme'
    },

    'stressor': {
        '1': 'Travail', // *
        '2': 'Relations', // *
        '3': 'Questions liées aux enfants, à leurs soins', // *
        '4': 'Questions liées aux parents, à leurs soins', // *
        '5': 'Collègues', // *
        '6': 'Finances', // *
        '7': 'Deuil', // *
        '8': 'Santé', // *
        '9': 'Retraite', // *
        '10': 'Domaine juridique', // *
        '11': 'Ménage', // *
        '12': 'Famille', // *
        '13': 'Autre', // *
        '14': 'Image corporelle', // *
        '15': 'Déplacements', // *
        '16': 'Voyages' // *
    },

    'trigger': {
        '1': 'Situation - Fr -',
        '2': 'Thought - Fr -',
        '3': 'Feeling - Fr -',
        '4': 'Behaviour - Fr -',
        '5': 'Sensation - Fr -',
        '6': 'Not sure - Fr -'
    },

    'serverError': {
        'unauthorized': 'Les données d’ouverture de session sont incorrectes. Veuillez réessayer.',
        'runtime.error': `Un problème est survenu dans le traitement de votre requête.
            Veuillez réessayer plus tard.` // *
    },

    'miscellaneous': {
        'characters': 'Caractères' // *
    },

    /* Buttons - START - ------------------------------------------------------------------------ */

    'btns': {
        'login': 'Ouvrir une session', // *
        'dismiss': 'Dismiss - Fr -',
        'reload': 'Reload - Fr -',
        'save': 'Sauvegarder', // *
        'back': 'Retour', // *
        'track': 'Track - Fr -',
        'ok': 'OK - Fr -'
    },

    /* Buttons - END - -------------------------------------------------------------------------- */

    /* Routes names - START - ------------------------------------------------------------------- */

    'routes': {
        'moodTracker': 'Outil de suivi de l\'humeur', // *
        'moodHistory': 'Historique des humeurs' // *
    },

    /* Routes names - END - --------------------------------------------------------------------- */

    /* Components - START - --------------------------------------------------------------------- */

    'drawerMenu': {
        'toggleNav': 'Sélecteur de navigation', // *
        'starlingID': 'Starling ID', // *
        'member': 'Membre', // *
        'logout': 'Fermeture de session' // *
    },

    /* Components - END - ----------------------------------------------------------------------- */

    /* Pages - START - -------------------------------------------------------------------------- */

    /* Login page - START - --------------------------------------------------------------------- */

    'login': {
        'emailTitle': 'Adresse courriel', // *
        'passwordTitle': 'Mot de passe' // *
    },

    /* Login page - END - ----------------------------------------------------------------------- */

    /* My Starling page - START - --------------------------------------------------------------- */

    'myStarling': {
        'title': 'What would you like to do? - Fr -',
        'linkToMoodTracker': 'Track a mood - Fr -',
        'linkToMoodHistory': 'Examine your history - Fr -'
    },

    /* My Starling page - END - ----------------------------------------------------------------- */

    /* Mood Tracker page - START - -------------------------------------------------------------- */

    'moodTracker': {
        'emotionsTitle': 'Comment vous êtes-vous senti?', // *
        'behaviourTitle': 'Que s’est-il produit?', // *
        'behaviourPlaceholder': 'Décrivez la situation ici', // *
        'triggers': 'Triggers - Fr -',
        'stressors': 'Stresseurs', // *
        'toggle': {
            'triggers': 'Toggle triggers list - Fr -',
            'stressors': 'Toggle stressors list - Fr -'
        },
        'noTriggersTitle': 'Sorry, no triggers are present. - Fr -',
        'noStressorsTitle': 'Désolé, aucun stress sont présents.', // *
        'success': {
            'goodWork': 'Beau travail! Vous avez bien évalué votre humeur.' // *
        },
        'error': {
            'charCountExceeds': 'Désolé, le nombre maximal de caractères permis est {{MAX_CHARS}}.', // *
            'moodInFuture': `Désolé, vous ne pourrez plus effectuer de suivi d’humeurs dans
                le futur.`, // *
            'duplicateMood': 'Vous avez déjà entré une humeur pour cette date et cette heure.', // *
            'server': `Une erreur inattendue est survenue sur le serveur.
            Veuillez réessayer d’enregistrer votre humeur.` // *
        }
    },

    /* Mood Tracker page - END - ---------------------------------------------------------------- */

    /* Mood History page - START - -------------------------------------------------------------- */

    'moodHistory': {
        'title': 'Great job - Fr -' // *
    },

    /* Mood History page - END - ---------------------------------------------------------------- */

    /* Pages - END - ---------------------------------------------------------------------------- */

    /* Dates related - START - ------------------------------------------------------------------ */

    'monthsFull': () => {
        'use strict';

        return [ 'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
            'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre' ];
    },
    'monthsShort': () => {
        'use strict';

        return [ 'jan', 'fev', 'mar', 'avr', 'mai', 'juin',
            'juil', 'aou', 'sep', 'oct', 'nov', 'dec' ];
    },
    'weekdaysFull': () => {
        'use strict';

        return [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ];
    },
    'weekdaysShort': () => {
        'use strict';

        return [ 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam' ];
    },

    /* Dates related - END - -------------------------------------------------------------------- */

    /* jQuery libraries - START - --------------------------------------------------------------- */

    'pickadate': {
        // Buttons
        'today': 'Aujourd’hui', // *
        'clear': 'Effacer', // *
        'close': 'Fermer', // *

        // Accessibility labels
        'labelMonthNext': 'Mois suivant', // *
        'labelMonthPrev': 'Mois précédent', // *
        'labelMonthSelect': 'Indiquer un mois', // *
        'labelYearSelect': 'Indiquer une année' // *
    },

    'pickatime': {
        // Clear button
        'clear': 'Effacer' // *
    }

    /* jQuery libraries - END - ----------------------------------------------------------------- */
};
