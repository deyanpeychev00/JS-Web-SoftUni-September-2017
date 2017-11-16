const AJAX_CALL = 'AJAX_CALL';
const AJAX_END = 'AJAX_END';
const AJAX_ERROR = 'AJAX_ERROR';

export default {
    requestCall: () => {
        return {
            type: AJAX_CALL
        }
    },
    requestFinish: () => {
        return {
            type: AJAX_END
        }
    },

    requestError: () => {
        return {
            type: AJAX_ERROR
        }
    }
}