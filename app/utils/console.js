export function label([raw]) {
    'use strict';

    const [ color, label, ...message ] = raw.split(' ');

    return [
        `%c${label}%c ${message.join(' ')}`,
        `color: white; background-color: ${color}; padding: 0 0.5em`,
        ''
    ];
}
