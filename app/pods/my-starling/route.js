import Route from 'ember-route';
import ResetScrollMixin from '../../mixins/reset-scroll';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {
});
