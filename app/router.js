import Router from 'ember-router';
import config from './config/environment';

const appRouter = Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

appRouter.map(function() {
    this.route('moods', { path: '/' }, function() {
        this.route('add', { path: '/add' });
        this.route('edit', { path: '/edit/:id' });
        this.route('list', { path: '/list' });
    });
});

export default appRouter;
