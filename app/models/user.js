import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
    firstName: attr('string'),
    lastName: attr('string'),
    email: attr('string'),
    nickname: attr('string'),
    locale: belongsTo('locale', { async: false })
});
