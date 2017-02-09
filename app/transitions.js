export default function() {
    'use strict';

    this.transition(
        this.fromRoute('my-starling'),
        this.toRoute('moods.add'),
        this.use('toRight'),
        this.reverse('toLeft')
    );
}
