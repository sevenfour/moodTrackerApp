# Mood Tracker App

This is an experimental and already outdated mood tracking progressive web app which targets mobile devices first.
The app is intended to behave close to native apps on mobile devices while also work as a web app with offline capabilities.

** NOTE: main files of interest for "data orchestration" **
app/pods/application/route.js
app/serviceworkers/sw.js
app/utils/pouchdb.js

"data orchestration" brief explanation:

1. app/pods/application/route.js

After the successful authentication, the moods are fetched from the server and the local db - IndexedDB - is populated with the latest data. To differentiate between moods coming from the server and local ones (not yet synced), moodTimeInMillisec property is used.     

Then, app/pods/application/route.js activate() method is called.
The reference for the local in-browser database - IndexedDB - is retrieved through ember-pouch. There is a redundancy in the app logic/architecture - both Ember Data (aka enhanced cache) and IndexedDB are used for experimental purposes. For a prod env only IndexedDB would be necessary.

Next, all the un-synced records are retrieved from IndexedDB by simply looking at the custom isSynced flag. In case there are any, those records are persisted and pushed into the store - Ember Data. Then, the db is updated - isSynced flag is toggled.

Testing the Internet connection is done manually by invoking the checkInternetConnection() method that simply fetches the server and looks at the response (not that reliable; consider Lie-Fi).

Syncing is also done manually. First, if there is Internet connection, all the un-synced moods are retrieved from the store (isSynced flag) and persisted. Then, the corresponding records are updated in the db - syncMoods() method.          

2. app/serviceworkers/sw.js

This is where Service Workers logic resides. There is only one caching strategy defined - staleWhileRevalidate. If the requested data is in cache, return it. In parallel, continue with the request and update the cache when the response arrives.

3. app/utils/pouchdb.js

Pouch DB minor functions. createSyncIndex() function is used to create db with the isSynced indexes, while createMoodTimeIndex() function is needed for the db with moodTimeInMillisec indexes. Those indexes are expected to expedite the look-up of the corresponding records.      


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation (outdated)

* `git clone <repository-url>` this repository
* `cd mood-tracker-app`
* `npm install`
* `bower install` (// UPDATE: should be switched to yarn)

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
