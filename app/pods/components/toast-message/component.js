import Component from 'ember-component';
import { empty, not, and, or } from 'ember-computed';

export default Component.extend({

    classNames: ['toast-message'],

    classNameBindings: [
        'isMessage:show-message',
        'isError:error',
        'isSuccess:success',
        'isConcurrency:hide-message'
    ],

    isErrorEmpty: empty('errorMessage'),

    isSuccessEmpty: empty('successMessage'),

    isError: not('isErrorEmpty'),

    isSuccess: not('isSuccessEmpty'),

    isMessage: or('isError', 'isSuccess'),

    isConcurrency: and('isError', 'isSuccess'),

    actions: {

        dismiss() {
            'use strict';

            if (this.get('isError')) {
                this.set('errorMessage', null);
            } else {
                this.set('successMessage', null);
            }
        }
    }

});
