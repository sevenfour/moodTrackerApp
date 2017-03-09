// import Model from 'ember-data/model';
import computed from 'ember-computed';

import { Model } from 'ember-pouch';

export default Model.extend({
    name: computed('i18n.locale', function() {
        'use strict';

        return this.get('i18n').t(`stressor.${this.get('id')}`);
    })
});
