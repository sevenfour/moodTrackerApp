// import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

import { Model } from 'ember-pouch';

export default Model.extend({
    code: attr('string'),
    stressorTypes: hasMany('stressor', { async: false }),
    triggerTypes: hasMany('trigger', { async: false })
});
