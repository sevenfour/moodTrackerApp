import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('drawer-menu', 'Integration | Component | drawer menu', {
    integration: true
});

test('it renders', function(assert) {
    'use strict';

    this.render(hbs`{{drawer-menu}}`);

    assert.equal(this.$('.navbar-link')[0].innerText, 'Mood Tracker');
    assert.equal(this.$('.navbar-link')[1].innerText, 'Mood History');
});
