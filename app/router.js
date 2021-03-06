import Router from 'ember-router';
import config from './config/environment';

const appRouter = Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

appRouter.map(function() {
    this.route('login', { path: '/login' });
    this.route('moods', { path: '/moods' }, function() {
        this.route('add', { path: '/add' });
        this.route('edit', { path: '/edit/:id' });
        this.route('list', { path: '/list' });
    });
    this.route('my-starling', { path: '/' });
});

export default appRouter;
