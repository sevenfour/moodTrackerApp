import attr from 'ember-data/attr';
import { Model } from 'ember-pouch';

export default Model.extend({
    language: attr('string'),
    region: attr('string')
});
