import Base from 'ember-simple-auth/authenticators/base';
import RSVP from 'rsvp';
import fetch from 'ember-network/fetch';
import { b64EncodeUnicode } from '../utils/strings';

const { Promise } = RSVP;

export default Base.extend({

    serverTokenEndpoint: '/mobile/api/auth/mlogin',

    logoutEndpoint: '/mobile/api/auth/logout',

    restore(data) {
        'use strict';

        return new Promise((resolve, reject) => {
            if (data.token) {
                resolve(data);
            } else {
                reject();
            }
        });
    },

    authenticate(options) {
        'use strict';

        return new Promise((resolve, reject) => {
            fetch(this.get('serverTokenEndpoint'), {
                method: 'POST',
                headers: {
                    'data-type': 'json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: options.identification,
                    password: options.password,
                    deviceId: 'pwa-app'
                })
                })
                .then((response) => {
                    return response.json();
                })
                .then((result) => {
                    const { firstName, lastName } = result;
                    const base64Token = result.token ? b64EncodeUnicode(result.token)
                        : null;

                    resolve({
                        user: {
                            firstName,
                            lastName
                        },
                        token: base64Token
                    });
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    },

    invalidate() {
        'use strict';

        return new Promise((resolve, reject) => {
            fetch(this.get('logoutEndpoint'), {
                method: 'GET'
                })
                .then((response) => {
                    resolve(response);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    }

});
