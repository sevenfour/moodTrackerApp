import attr from 'ember-data/attr';
import { Model } from 'ember-pouch';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
    moodTime: attr('date'),
    anxiety: attr('number', { defaultValue: 0 }),
    sadness: attr('number', { defaultValue: 0 }),
    worry: attr('number', { defaultValue: 0 }),
    behaviour: attr('string'), // use for situation
    moodTrigger: attr('string', { defaultValue: null }),
    stressors: hasMany('stressor', { async: false }),

    isSynced: attr('boolean', { defaultValue: false }) // use as backend sync flag
});
