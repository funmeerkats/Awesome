const DEFAULT_STATE = {defaultProp: 'default'};
const stateApp = (state = {...DEFAULT_STATE}, action) => {
    switch (action.type) {
        case 'ADD_PROP': {
            return {
                ...state,
                ...action.data
            }
        }
        case 'REMOVE_PROP': {
            let stateData = {...state};
            delete stateData[action.propName];
            return stateData;
        }
        case 'RESET_PROP': {
            return {...DEFAULT_STATE};
        }
        default: {
            return state;
        }

    }
};

export {stateApp};
