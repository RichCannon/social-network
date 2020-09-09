import {profileAPI} from "../api/api";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = 'my-app/profile/ADD-POST';
const SET_USER_PROFILE = 'my-app/profile/SET_USER_PROFILE';
const SET_STATUS = 'my-app/profile/SET_STATUS';
const SET_PHOTO = 'my-app/profile/SET_PHOTO';



let initialState = { //profilePage
    postData:
        [
            {id: 1, message: 'My first post', likeCount: 15},
            {id: 2, message: 'I need to add comment section', likeCount: 20}
        ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action:ActionCreatorsType):InitialStateType => {
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
            return {...state, profile: {...state.profile, photos: action.photo} as ProfileType}
        }
        default:
            return state;
    }
}


type ActionCreatorsType = AddPostType | SetUserProfileType | SetStatusType | SetPhotoType


type AddPostType = {
    type: typeof ADD_POST
    postMessage:string
}

export const addPost = (postMessage:string):AddPostType => ({
    type: ADD_POST,
    postMessage
})

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

export const setUserProfile = (profile: ProfileType):SetUserProfileType => ({
    type: SET_USER_PROFILE,
    profile
})



type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}

export const setStatus = (status:string):SetStatusType => ({
    type: SET_STATUS,
    status
})

type SetPhotoType = {
    type: typeof SET_PHOTO
    photo: PhotosType
}

export const setPhoto = (photo:PhotosType):SetPhotoType => ({
    type: SET_PHOTO,
    photo
})

export const getUsersProfile = (userId:number) => async (dispatch:any) => {
    let data = await profileAPI.getUsersProfile(userId);
    dispatch(setUserProfile(data));

}

export const getStatus = (userId:number) => async (dispatch:any) => {
    let data = await profileAPI.getStatusAPI(userId);
    dispatch(setStatus(data));

}

export const changePhoto = (file:any) => async (dispatch:any) => {
    let data = await profileAPI.changePhoto(file);
    dispatch(setPhoto(data.data.photos));

}


export const updateStatus = (status:string) => async (dispatch:any, getState:any) => {

    let userId = getState().authData.id;
    let response = await profileAPI.updateStatusAPI(status);
    if (response.data.resultCode === 0) {
        dispatch(getStatus(userId));
    } else {
        console.error('Server error(updateStatusAPI)');
    }

}

export const saveProfile = (profileData:ProfileType) => async (dispatch:any, getState:any) => {
    let userId = getState().authData.id
    let response = await profileAPI.putProfile(profileData);
    if (response.data.resultCode === 0) {
        dispatch(getUsersProfile(userId));
    } else {
        console.error('Server error(putProfile)');
    }
}


export default profileReducer;
