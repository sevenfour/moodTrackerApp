import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login-form', 'Integration | Component | login form', {
    integration: true
});

test('it renders', function(assert) {
    'use strict';

    this.render(hbs`{{login-form}}`);

    assert.equal(document.querySelectorAll('.control-label')[0].textContent.trim(), 'Email');
    assert.equal(document.querySelectorAll('.control-label')[1].textContent.trim(), 'Password');
});
