import Controller from 'ember-controller';

export default Controller.extend({

    moods: [
        {
            emotion: 'sadness',
            emotionToDisplay: 'moods.sadness',
            low: 'sad',
            high: 'happy'
        },
        {
            emotion: 'anxiety',
            emotionToDisplay: 'moods.anxiety',
            low: 'anxious',
            high: 'relaxed'
        },
        {
            emotion: 'worry',
            emotionToDisplay: 'moods.worry',
            low: 'worried',
            high: 'calm'
        }
    ]

});
