import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'my-app/auth/SET_USER_DATA';


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data
            }
        }
        default:
            return state;
    }
}

export const setUserData = (id, email, login, isAuth) => ({
    type: SET_USER_DATA,
    data: {id, email, login, isAuth}
})

export const getAuth = () => async (dispatch) => {
    let data = await authAPI.getAuthAPI();
    if (data.resultCode === 0) {
        const {id, email, login} = data.data;
        dispatch(setUserData(id, email, login, true));
    } else {
        dispatch(setUserData(null, null, null, false))
        console.error('BLYAD AUTH SLOMALSYA');
    }
}


export const login = (email, password, rememberMe = false) => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe);
    if (data.resultCode === 0) {
        dispatch(getAuth());
    } else {
        console.log(data.messages[0]);
        dispatch(stopSubmit('login', {_error: data.messages[0]}));
        console.error('Cannot get response from API for LOGIN');
    }
}

export const logout = () => async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(getAuth());
    } else {
        console.error('Cannot get response from API for LOGOUT');
    }
}


export default authReducer;