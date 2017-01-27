import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('toast-update-ready', 'Integration | Component | toast update ready', {
    integration: true
});

test('toast-update-ready is hidden', function(assert) {
    'use strict';

    this.inject.service('notify');

    this.get('notify').set('isUpdateReady', false);

    this.render(hbs`{{toast-update-ready
        notify=notify}}`);

    assert.notOk(this.$('.toast-update-ready').hasClass('update-ready'));
});

test('toast-update-ready is displayed', function(assert) {
    'use strict';

    this.inject.service('notify');

    this.get('notify').set('isUpdateReady', true);

    this.render(hbs`{{toast-update-ready
        notify=notify}}`);

    assert.ok(this.$('.toast-update-ready').hasClass('update-ready'));
});
