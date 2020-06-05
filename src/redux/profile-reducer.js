import {profileAPI} from "../api/api";

const ADD_POST = 'my-app/profile/ADD-POST';
const SET_USER_PROFILE = 'my-app/profile/SET_USER_PROFILE';
const SET_STATUS = 'my-app/profile/SET_STATUS';
const SET_PHOTO = 'my-app/profile/SET_PHOTO';

let initialState = { //profilePage
    postData:
        [
            {id: 1, message: 'My first post', likeCount: '15'},
            {id: 2, message: 'I need to add comment section', likeCount: '20'}
        ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                postData: [{
                    id: 3,
                    message: action.postMessage,
                    likeCount: 0
                },
                    ...state.postData]
            }

        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile};
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case SET_PHOTO: {
            return {...state, profile: {...state.profile, photos: action.photo}}
        }
        default:
            return state;
    }
}


export const addPost = (postMessage) => ({
    type: ADD_POST,
    postMessage
})

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
})

export const getUsersProfile = (userId) => async (dispatch) => {
    let data = await profileAPI.getUsersProfile(userId);
    dispatch(setUserProfile(data));

}

export const setStatus = (status) => ({
    type: SET_STATUS,
    status
})
export const setPhoto = (photo) => ({
    type: SET_PHOTO,
    photo
})

export const getStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getStatusAPI(userId);
    dispatch(setStatus(data));

}

export const changePhoto = (file) => async (dispatch) => {
    let data = await profileAPI.changePhoto(file);
    dispatch(setPhoto(data.data.photos));

}


export const updateStatus = (status) => async (dispatch, getState) => {

    let userId = getState().authData.id;
    let response = await profileAPI.updateStatusAPI(status);
    if (response.data.resultCode === 0) {
        dispatch(getStatus(userId));
    } else {
        console.error('Server error(updateStatusAPI)');
    }

}

export const saveProfile = (profileData) => async (dispatch, getState) => {
    let userId = getState().authData.id
    let response = await profileAPI.putProfile(profileData);
    if (response.data.resultCode === 0) {
        dispatch(getUsersProfile(userId));
    } else {
        console.error('Server error(putProfile)');
    }
}


export default profileReducer;