
const asyncDataThunk = (state = 0, action) => {
    switch (action.type) {
        case 'ASYNC_THUNK':
        case 'NOT_ASYNC_THUNK': {
            return action.data;
        }

        default: {
            return state
        }
    }
};

const asyncDataSaga = (state = {asyncCount: 0, notAsyncCount: 0}, action) => {
    switch (action.type) {
        case 'ASYNC_SAGA': {
            return {
                ...state,
                asyncCount: action.count
            };
        }

        case 'NOT_ASYNC_SAGA': {
            return {
                ...state,
                notAsyncCount: action.count
            };
        }

        default: {
            return state
        }
    }
};

const setData = (state = {}, action) => {
    switch (action.type) {
        case 'SET': {
            return {
                ...state,
                [action.smth]: true
            };
        }

        default: {
            return state
        }
    }
};



const actionCreator = (type, data = 0) => ({type, data});
const actionCreatorForSaga = (type, data = {}) => ({type, data});

export const createAsyncActionHelper = (data) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(actionCreator('ASYNC_THUNK', data))
        }, 5000);
    }
};

export const createNotAsyncActionHelper = (data) => {
    return (dispatch) => {
        dispatch(actionCreator('NOT_ASYNC_THUNK', data))
    }
};

export {asyncDataThunk, asyncDataSaga, setData, actionCreator, actionCreatorForSaga}
