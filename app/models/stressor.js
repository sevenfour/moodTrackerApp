import DS from 'ember-data';
import computed from 'ember-computed';

const { Model } = DS;

export default Model.extend({
    name: computed('i18n.locale', function() {
        'use strict';

        return this.get('i18n').t(`stressor.${this.get('id')}`);
    })
});
