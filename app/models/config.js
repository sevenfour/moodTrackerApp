import attr from 'ember-data/attr';
import { Model } from 'ember-pouch';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
    code: attr('string'),
    stressorTypes: hasMany('stressor', { async: false }),
    triggerTypes: hasMany('trigger', { async: false })
});
