import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('time-picker', 'Integration | Component | time picker', {
    integration: true
});

test('it renders', function(assert) {
    'use strict';

    assert.expect(1);

    this.inject.service('i18n');

    this.render(hbs`{{time-picker
        interval=60
        class='input time form-control'
        i18n=i18n}}`);

    const items = this.$('ul li');

    assert.equal(items.length, 25);

});
