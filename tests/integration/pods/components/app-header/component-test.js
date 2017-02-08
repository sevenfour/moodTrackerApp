import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-header', 'Integration | Component | app header', {
  integration: true
});

test('it renders', function(assert) {
    'use strict';

    this.set('imgSource', 'logo');

    this.render(hbs`{{app-header
        imgSource=imgSource}}`);

    assert.ok(this.$('svg').hasClass('starling-logo'));
});
