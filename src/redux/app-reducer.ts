import {getAuth} from "./auth-reducer"

const INITIALIZED_SUCCESS = 'my-app/app/INITIALIZED_SUCCESS'

let initialState = { //appData
    initialized: false
}

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionCreatorsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state
    }
}

type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}

type ActionCreatorsType = InitializedSuccessType;

export const initializedSuccess = ():InitializedSuccessType => ({
    type: INITIALIZED_SUCCESS
})

export const initializingProcess = () => {
    return async (dispatch: any) => {
        await dispatch(getAuth())
        dispatch(initializedSuccess())
    }
}

export default appReducer
