import DS from 'ember-data';
import { Serializer } from 'ember-pouch';

const { EmbeddedRecordsMixin } = DS;

export default Serializer.extend(EmbeddedRecordsMixin, {
});
