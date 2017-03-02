import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
    firstName: attr('string'),
    lastName: attr('string'),
    locale: belongsTo('locale', { async: false })
});
