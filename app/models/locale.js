import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
    language: attr('string'),
    region: attr('string')
});
