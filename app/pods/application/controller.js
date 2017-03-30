import Controller from 'ember-controller';
import service from 'ember-service/inject';
import { alias, filterBy, gt } from 'ember-computed';

export default Controller.extend({

    session: service(),

    errorMessage: null,

    successMessage: null,

    isSyncing: alias('model.isSyncing.isRunning'),

    isSaving: false,

    moods: alias('model.moods'),

    unsyncedMoods: filterBy('moods', 'isSynced', false),

    areAnyUnsyncedMoods: gt('unsyncedMoods.length', 0)

});
