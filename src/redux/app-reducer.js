import {getAuth} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'my-app/app/INITIALIZED_SUCCESS';

let initialState = { //appData
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            let stateCopy =  {
                ...state,
                initialized: true
            }
            return stateCopy;
        }
        default:
            return state;
    }
}

export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS
})

export const initializingProcess = () => {
    return  (dispatch) => {
     dispatch(getAuth());
     dispatch(initializedSuccess());
    }
}

export default appReducer;