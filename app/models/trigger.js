import Model from 'ember-data/model';
import computed from 'ember-computed';

export default Model.extend({
    name: computed('i18n.locale', function() {
        'use strict';

        return this.get('i18n').t(`trigger.${this.get('id')}`);
    })
});
