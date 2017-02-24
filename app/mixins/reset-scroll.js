// import $ from 'jquery';
import Mixin from 'ember-metal/mixin';

export function scrollToTop() {
    if (document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0) {
        window.scrollBy(0, -30);
        requestAnimationFrame(scrollToTop);
    }
}

export default Mixin.create({

    activate() {
        'use strict';

        this._super();

        if (document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0) {
            window.scrollBy(0, -50);
            requestAnimationFrame(scrollToTop);
        }
    }
});
