import Helper from 'ember-helper';

// length argument is required to re-fire the helper when list changes
export function isItemSelected([ item, list, length ]) { // eslint-disable-line no-unused-vars

    if (item && item.indexOf) {
        // item is a list, check for intersection
        for (let i = 0; i < item.length; i++) {
            if (list.indexOf(item.objectAt(i)) > -1) {
                return 'selected';
            }
        }
    } else {
        // item is not a list, check for membership
        if (list && list.indexOf(item) > -1) {
            return 'selected';
        }
    }
    return '';
}

export default Helper.helper(isItemSelected);
