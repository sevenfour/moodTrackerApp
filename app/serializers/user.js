import DS from 'ember-data';

const { JSONSerializer, EmbeddedRecordsMixin } = DS;

export default JSONSerializer.extend(EmbeddedRecordsMixin, {
    attrs: {
        locale: { embedded: 'always' }
    }
});
