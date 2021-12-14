import { matchConstants } from '../_constants';
import { matchService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const matchActions = {
    register,
    getAll,
    update,
    delete: _delete
};

function register(match) {
    return dispatch => {
        dispatch(request(match));

        matchService.register(match)
            .then(
                match => { 
                    dispatch(success());
                    history.push('/record');
                    dispatch(alertActions.success('Submission successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(match) { return { type: matchConstants.REGISTER_REQUEST, match } }
    function success(match) { return { type: matchConstants.REGISTER_SUCCESS, match } }
    function failure(error) { return { type: matchConstants.REGISTER_FAILURE, error } }
}

function update(match) {
    return dispatch => {
        dispatch(request(match));

        matchService.update(match)
            .then(
                match => { 
                    dispatch(success());
                    history.push('/record');
                    dispatch(alertActions.success('Update successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(match) { return { type: matchConstants.UPDATE_REQUEST, match } }
    function success(match) { return { type: matchConstants.UPDATE_SUCCESS, match } }
    function failure(error) { return { type: matchConstants.UPDATE_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        matchService.getAll()
            .then(
                matches => dispatch(success(matches)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: matchConstants.GETALL_REQUEST } }
    function success(matches) { return { type: matchConstants.GETALL_SUCCESS, matches } }
    function failure(error) { return { type: matchConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        matchService.delete(id)
            .then(
                match => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: matchConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: matchConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: matchConstants.DELETE_FAILURE, id, error } }
}