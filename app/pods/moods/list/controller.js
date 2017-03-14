import Controller from 'ember-controller';

export default Controller.extend({

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
    ]

});
