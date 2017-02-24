import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
    moodTime: attr('date'),
    anxiety: attr('number', { defaultValue: 0 }),
    sadness: attr('number', { defaultValue: 0 }),
    worry: attr('number', { defaultValue: 0 }),
    behaviour: attr('string'), // use for situation
    stressors: hasMany('stressor', { async: false }),
    triggers: hasMany('trigger', { async: false })
});
