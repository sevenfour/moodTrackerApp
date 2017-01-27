
// Message handler
self.onmessage = (event) => {
    const data = event.data;

    if (data.action === 'skipWaiting') {
        if (self.skipWaiting) {
            self.skipWaiting();
        }
    }
};
