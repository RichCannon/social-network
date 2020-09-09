import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'my-app/auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'my-app/auth/SET_CAPTCHA_URL';

/*type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaURL: string | null
}*/

let initialState = { //authData
    id: null as number | null,
    email: null as string | null ,
    login: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = SetUserDataType | SetCaptchaUrlType

type SetUserDataPayloadType = {
    id: number | null, email: string | null, login: string | null, isAuth: boolean
}

type SetUserDataType = {
    type: typeof SET_USER_DATA,
    data: SetUserDataPayloadType
}

export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataType => ({
    type: SET_USER_DATA,
    data: {id, email, login, isAuth}
})

type SetCaptchaUrlType = {
    type: typeof SET_CAPTCHA_URL
    data: { captchaURL: string }
}

export const setCaptchaURL = (captchaURL: string): SetCaptchaUrlType => ({
    type: SET_CAPTCHA_URL,
    data: {captchaURL}
})

export const getAuth = () => async (dispatch: any) => {
    let data = await authAPI.getAuthAPI();
    if (data.resultCode === 0) {
        console.log(data)
        const {id, email, login} = data.data;
        dispatch(setUserData(id, email, login, true));
    } else {
        dispatch(setUserData(null, null, null, false))
    }
}


export const login = (email: string, password: string, rememberMe = false, captcha: string) => async (dispatch: any) => {
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

export const logout = () => async (dispatch: any) => {
    let data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(getAuth());
    } else {
        console.error('Cannot get response from API for LOGOUT');
    }
}

export const getCaptchaURL = () => async (dispatch: any) => {
    let data = await securityAPI.getCaptchaURL();
    dispatch(setCaptchaURL(data.url))
}


export default authReducer;
