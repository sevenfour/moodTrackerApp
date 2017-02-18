
// Message handler
self.onmessage = (event) => {
    const data = event.data;

    if (data.action === 'skipWaiting') {
        if (self.skipWaiting) {
            self.skipWaiting();
        }
    }
};

// NOTE: for testing login only!
// self.addEventListener('fetch', (event) => {
//     'use strict';
//
//     let requestURL = new URL(event.request.url);
//
//     if (requestURL.origin === location.origin) {
//         if (requestURL.pathname.endsWith('/mobile/api/auth/mlogin')) {
//             const tokenResponse = {
//                 token: 'b5c856213288d6045fccc8bdb842db227841e29c326a93f08a617d0a8cb7c6a8'
//             };
//
//             event.respondWith(
//                 new Response(JSON.stringify(tokenResponse),
//                     {
//                         headers: {'Content-Type': 'application/json'}
//                     }
//                 )
//             );
//         }
//     }
// });
//
// self.addEventListener('fetch', (event) => {
//     'use strict';
//
//     let requestURL = new URL(event.request.url);
//
//     if (requestURL.origin === location.origin) {
//         if (requestURL.pathname.endsWith('/api/auth/logout')) {
//             const logutResponse = {
//                 'logout': 'Successfully logged out!'
//             };
//             event.respondWith(
//                 new Response(JSON.stringify(logutResponse),
//                     {
//                         headers: {'Content-Type': 'application/json'}
//                     }
//                 )
//             );
//         }
//     }
// });
