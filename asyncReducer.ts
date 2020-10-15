
interface actionObj {
    type: string,
    [key: string]: number | string
}

interface actionSagaObj {
    type: string,
    data: actionSagaDataObj
}

interface actionSagaDataObj {
    async?: boolean,
    count?: number
}

const asyncDataThunk = (state: number = 0, action: actionObj) => {
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

const asyncDataSaga = (state = {asyncCount: 0, notAsyncCount: 0}, action: actionObj) => {
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

const setData = (state = {}, action: actionObj) => {
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


const actionCreator = (type: string, data: number = 0): actionObj => ({type, data});
const actionCreatorForSaga = (type: string, data: actionSagaDataObj = {}): actionSagaObj => ({type, data});

const createAsyncActionHelper = (data: number) => {
    return (dispatch: (action: actionObj) => void) => {
        setTimeout(() => {
            dispatch(actionCreator('ASYNC_THUNK', data))
        }, 5000);
    }
};

const createNotAsyncActionHelper = (data: number) => {
    return (dispatch: (action: actionObj) => void) => {
        dispatch(actionCreator('NOT_ASYNC_THUNK', data))
    }
};

export {asyncDataThunk, asyncDataSaga, setData, actionCreatorForSaga, actionCreator, createAsyncActionHelper, createNotAsyncActionHelper}
