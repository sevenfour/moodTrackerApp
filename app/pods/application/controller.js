import Controller from 'ember-controller';
import service from 'ember-service/inject';

export default Controller.extend({

    session: service(),

    errorMessage: null,

    successMessage: null,

    isSaving: false

});
