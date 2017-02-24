import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mood-value-input', 'Integration | Component | mood value input', {
    integration: true
});

test('it renders', function(assert) {
    'use strict';

    const mood = {
        emotion: 'sadness',
        low: 'sad',
        high: 'happy'
    };

    this.set('mood', mood);

    this.inject.service('i18n');

    this.render(hbs`{{mood-value-input
        mood=mood
        i18n=i18n}}`);

    assert.equal(document.querySelectorAll('.mood-label')[0].classList[1], 'sadness');
    assert.equal(document.querySelectorAll('.mood-label')[1].classList[1], 'sadness');
    assert.equal(document.querySelectorAll('.mood-label')[0].innerText.trim(), 'Sad');
    assert.equal(document.querySelectorAll('.mood-label')[1].innerText.trim(), 'Happy');
});
