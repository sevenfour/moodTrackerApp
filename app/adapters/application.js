import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const { RESTAdapter } = DS;

export default RESTAdapter.extend(DataAdapterMixin, {

    namespace: '/api',

    authorizer: 'authorizer:custom'

});
