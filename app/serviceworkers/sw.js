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

    localeURL: '/mobile/api/users/id/locales/id',

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

    processLocaleChange(event) {
        'use strict';

        const cacheName = this.getCacheName();

        event.respondWith(
            caches.open(cacheName).then((cache) => {
                const userURL = this.staleWhileRevalidateURLs.find((url) => {
                    return url.indexOf('users') !== -1;
                });
                const userRequest = new Request(userURL);
                const requestToRead = event.request.clone();
                const localeFetch = fetch(event.request).then((networkResponse) => {
                    return networkResponse;
                });

                // Search and update .../users/id entry in the cache, then fetch locale change
                return cache.match(userRequest).then((response) => {
                    if (response) {
                        const responseToRead = response.clone();

                        return requestToRead.json().then((data) => {
                            const newLocale = data.language;

                            return responseToRead.json().then((data) => {
                                  data.locale.language = newLocale;

                                  const updatedUserResponse = new Response(JSON.stringify(data), {
                                      'status': 200,
                                      'statusText': 'OK',
                                      headers: {
                                          'content-type': 'application/json'
                                      }
                                  });

                                  return cache.put(userRequest, updatedUserResponse).then(() => {
                                      return localeFetch;
                                  });
                            });
                        });
                    } else {
                        return localeFetch;
                    }
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

                    cache.delete(request);
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
            const pathname = requestURL.pathname;
            if (this.staleWhileRevalidateURLs.some((url) => {
                return url === pathname;
            })) {
                return this.processStaleWhileRevalidateURLs(event);
            } else if (pathname === this.logOutURL) {
                return this.processLogout(event);
            }
        }
    },

    processPUT(event) {
        'use strict';

        const requestURL = new URL(event.request.url);

        if (requestURL.origin === location.origin) {
            if (requestURL.pathname === this.localeURL) {
                return this.processLocaleChange(event);
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
    } else if (requestMethod === 'PUT') {
        swUtilsObj.processPUT(event);
    }
});
