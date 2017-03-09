import attr from 'ember-data/attr';
import { Model } from 'ember-pouch';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
    firstName: attr('string'),
    lastName: attr('string'),
    locale: belongsTo('locale', { async: false })
});
