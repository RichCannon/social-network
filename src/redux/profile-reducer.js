import {profileAPI} from "../api/api";

const ADD_POST = 'my-app/profile/ADD-POST';
const SET_USER_PROFILE = 'my-app/profile/SET_USER_PROFILE';
const SET_STATUS = 'my-app/profile/SET_STATUS';

let initialState = { //profilePage
    postData:
        [
            {id: 1, message: 'Zdarova, Kisa, kak dela?', likeCount: '15'},
            {id: 2, message: 'Hto? Ya? A da? Nu da', likeCount: '20'}
        ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            /* let stateCopy = {...state};
             stateCopy.postData = [...state.postData];
             let currentPost = {
                 id: 3,
                 message: action.postMessage,
                 likeCount: 0
             };
             stateCopy.postData.push(currentPost);*/
            return {
                ...state,
                postData: [...state.postData, {
                    id: 3,
                    message: action.postMessage,
                    likeCount: 0
                }]
            }

        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile};
        }
        case SET_STATUS: {
            return {...state, status: action.status}
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

export const getUsersProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getUsersProfile(userId).then(data => {
            dispatch(setUserProfile(data));
        })
    }
}

export const setStatus = (status) => ({
    type: SET_STATUS,
    status
})

export const getStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getStatusAPI(userId);
    dispatch(setStatus(data));

}


export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatusAPI(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    } else {
        console.error('BLYAD UPDATE STATUS SLOMALSYA');
    }

}


export default profileReducer;