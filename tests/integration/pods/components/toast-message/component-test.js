import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('toast-message', 'Integration | Component | toast message', {
    integration: true
});

test('error message is set', function(assert) {
    'use strict';

    const errorMessage = 'Test error';

    this.set('error', errorMessage);
    this.set('success', null);

    this.render(hbs`{{toast-message
        errorMessage=error
        successMessage=success}}`);

    assert.ok(this.$('.toast-message').hasClass('error'));
    assert.ok(this.$('.toast-message').hasClass('show-message'));
});

test('success message is set', function(assert) {
    'use strict';

    const successMessage = 'Test success';

    this.set('error', null);
    this.set('success', successMessage);

    this.render(hbs`{{toast-message
        errorMessage=error
        successMessage=success}}`);

    assert.ok(this.$('.toast-message').hasClass('success'));
    assert.ok(this.$('.toast-message').hasClass('show-message'));
});

test('Both error and success messages are set', function(assert) {
    'use strict';

    const errorMessage = 'Test error';
    const successMessage = 'Test success';

    this.set('error', errorMessage);
    this.set('success', successMessage);

    this.render(hbs`{{toast-message
        errorMessage=error
        successMessage=success}}`);

    assert.ok(this.$('.toast-message').hasClass('error'));
    assert.ok(this.$('.toast-message').hasClass('success'));
    assert.ok(this.$('.toast-message').hasClass('hide-message'));
});
