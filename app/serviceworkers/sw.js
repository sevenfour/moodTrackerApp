/* global toolbox */

// Message handler
self.onmessage = (event) => {
    const data = event.data;

    if (data.action === 'skipWaiting') {
        if (self.skipWaiting) {
            self.skipWaiting();
        }
    }
};

const swUtilsObj = {

    staleWhileRevalidateURLs: [
        '/mobile/api/users/id',
        '/mobile/api/organizations/id/configs/id'
    ],

    logOutURL: '/mobile/api/auth/logout',

    getCacheName() {
        'use strict';

        return toolbox.options.cache.name;
    },

    processStaleWhileRevalidateURLs(event) {
        'use strict';

        const cacheName = this.getCacheName();

        event.respondWith(
            caches.open(cacheName).then((cache) => {
                const request = event.request;

                return cache.match(request).then((response) => {
                    const fetchPromise = fetch(request).then((networkResponse) => {
                        cache.put(request, networkResponse.clone());

                        return networkResponse;
                    });

                    return response || fetchPromise;
                });
            })
        );
    },

    processLogout(event) {
        'use strict';

        const cacheName = this.getCacheName();

        event.respondWith(
            caches.open(cacheName).then((cache) => {
                this.staleWhileRevalidateURLs.forEach((url) => {
                    const request = new Request(url);

                    cache.match(request).then((response) => {
                        if (response) {
                            cache.delete(response);
                        }
                    });
                });

                return fetch(event.request).then((networkResponse) => {
                    return networkResponse;
                });
            })
        );
    },

    processGET(event) {
        'use strict';

        const requestURL = new URL(event.request.url);

        if (requestURL.origin === location.origin) {
            if (this.staleWhileRevalidateURLs.some((url) => {
                return url === requestURL.pathname;
            })) {
                return this.processStaleWhileRevalidateURLs(event);
            } else if (requestURL.pathname === this.logOutURL) {
                return this.processLogout(event);
            }
        }
    }

};

// GET event listener for stale-while-revalidate
self.addEventListener('fetch', (event) => {
    'use strict';

    const requestMethod = event.request.method;

    if (requestMethod === 'GET') {
        swUtilsObj.processGET(event);
    }
});
