import run from 'ember-debug';

export default function destroyApp(application) {
  run(application, 'destroy');
}
