import { matchConstants } from '../_constants';

export function matches(state = {}, action) {
    switch (action.type) {
        case matchConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case matchConstants.GETALL_SUCCESS:
            return {
                items: action.matches
            };
        case matchConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case matchConstants.DELETE_REQUEST:
            // add 'deleting:true' property to match being deleted
            return {
                ...state,
                items: state.items.map(match =>
                    match.id === action.id
                        ? { ...match, deleting: true }
                        : match
                )
            };
        case matchConstants.DELETE_SUCCESS:
            // remove deleted match from state
            return {
                items: state.items.filter(match => match.id !== action.id)
            };
        case matchConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to match 
            return {
                ...state,
                items: state.items.map(match => {
                    if (match.id === action.id) {
                        // make copy of match without 'deleting:true' property
                        const { deleting, ...matchCopy } = match;
                        // return copy of match with 'deleteError:[error]' property
                        return { ...matchCopy, deleteError: action.error };
                    }

                    return match;
                })
            };
        default:
            return state
    }
}