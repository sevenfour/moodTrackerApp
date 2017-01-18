import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
    language: attr('string'),
    region: attr('string')
});
