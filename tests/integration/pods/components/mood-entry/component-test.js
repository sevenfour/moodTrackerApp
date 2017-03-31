import Object from 'ember-object';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('mood-entry', 'Integration | Component | mood entry', {
    integration: true
});

test('it renders', function(assert) {
    'use strict';

    const behaviour = 'Last donut is gone; that is sad!';

    const mood = Object.create({
        moodTime: new Date(),
        sadness: -5,
        anxiety: 3,
        worry: 0,
        behaviour
    });

    this.set('mood', mood);

    this.render(hbs`{{mood-entry
        mood=mood}}`);

    assert.equal(this.$('p.mood-data').text().trim(), behaviour);
});
