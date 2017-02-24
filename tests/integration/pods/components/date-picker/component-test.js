import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('date-picker', 'Integration | Component | date picker', {
    integration: true
});

test('it renders', function(assert) {
    'use strict';

    assert.expect(3);

    this.inject.service('i18n');

    this.render(hbs`{{date-picker
        class='testOne testTwo testThree'
        i18n=i18n}}`);

    assert.ok(this.$('input.testOne').hasClass('testTwo'));
    assert.ok(this.$('input.testOne').hasClass('testThree'));

    assert.equal(this.$('input.testOne').attr('type'), 'text');
});
