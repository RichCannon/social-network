import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'my-app/auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'my-app/auth/SET_CAPTCHA_URL';

let initialState = { //authData
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaURL: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL: {
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

export const setCaptchaURL = (captchaURL) => ({
    type: SET_CAPTCHA_URL,
    data: {captchaURL}
})

export const getAuth = () => async (dispatch) => {
    let data = await authAPI.getAuthAPI();
    if (data.resultCode === 0) {
        const {id, email, login} = data.data;
        dispatch(setUserData(id, email, login, true));
    } else {
        dispatch(setUserData(null, null, null, false))
    }
}


export const login = (email, password, rememberMe = false, captcha = null) => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
        dispatch(getAuth());
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaURL());
        }
        dispatch(stopSubmit('login', {_error: data.messages[0]})); // Sending error message in Login and display error message
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

export const getCaptchaURL = () => async (dispatch) => {
    let data = await securityAPI.getCaptchaURL();
    dispatch(setCaptchaURL(data.url))
}


export default authReducer;