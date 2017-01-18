import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-header', 'Integration | Component | app header', {
  integration: true
});

test('it renders', function(assert) {
    'use strict';

    this.set('firstName', 'Salomon');
    this.set('imgSource', 'logo');

    this.render(hbs`{{app-header
        firstName=firstName
        imgSource=imgSource}}`);

    assert.ok(this.$('.userName').text().indexOf('Salomon') > -1);
});
