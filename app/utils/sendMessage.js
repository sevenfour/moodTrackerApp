import RSVP from 'rsvp';

export function sendMessage(message) {
    return new RSVP.Promise((resolve, reject) => {
        let messageChannel = new MessageChannel();

        messageChannel.port1.onmessage = (event) => {
          if (event.data.error) {
              reject(event.data.error);
          } else {
              resolve(event.data);
          }
        };

        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
        }
    });
}
