import {usersAPI} from "../api/api";
import {UserItemType} from "../types/types";
import {AppStateType} from "./redux-store";
// import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

const TOGGLE_FOLLOW = 'my-app/users/TOGGLE_FOLLOW';
const SET_USERS = 'my-app/users/SET_USERS';
const SET_CURRENT_PAGE = 'my-app/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'my-app/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'my-app/users/TOGGLE_IS_FETCHING';
const FOLLOWING_IN_PROGRESS = 'my-app/users/FOLLOWING_IN_PROGRESS';


let initialState = {
    users: [] as Array<UserItemType>,
    totalCount: 0, // Amount of all registred users
    pageSize: 5, // Amount of users on 1 page
    currentPage: 1,
    isFetching: true,
    followedUsersId: [] as Array<number> // On which users follow/unfollow in progress
}




const userReducer = (state = initialState, action:ActionCreatorsType) => {
    switch (action.type) {
        case TOGGLE_FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (action.userId === u.id) {
                        return {...u, followed: !u.followed};
                    }
                    return u;
                })
            };
        }


        case SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalCount: action.totalCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case FOLLOWING_IN_PROGRESS: {

            return {
                ...state,
                followedUsersId: action.isFollowing
                    ? [...state.followedUsersId, action.userId]
                    : [...state.followedUsersId.filter(id => action.userId !== id)]
            }
        }
        default:
            return state;
    }
}

type ActionCreatorsType = ToggleFollowType | SetCurrentPageType | SetUsersType |
SetTotalUsersCountType | ToggleIsFetchingType | FollowingInProgressType

/*type GetStateType = ()=> AppStateType
type DispatchType = Dispatch<ActionCreatorsType>*/

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionCreatorsType>

type ToggleFollowType = {
    type: typeof TOGGLE_FOLLOW
    userId: number
}

export const toggleFollow = (userId: number): ToggleFollowType => ({
    type: TOGGLE_FOLLOW,
    userId
})

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UserItemType>
}

export const setUsers = (users: Array<UserItemType>): SetUsersType => ({
    type: SET_USERS,
    users
})

type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}

export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount
})

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({ // Indicator for Preloader
    type: TOGGLE_IS_FETCHING,
    isFetching
})

type FollowingInProgressType = {
    type: typeof FOLLOWING_IN_PROGRESS
    isFollowing: boolean
    userId: number
}

export const followingInProgress
    = (isFollowing: boolean, userId: number): FollowingInProgressType => ({ // For disabling FOLLOW button
    type: FOLLOWING_IN_PROGRESS,
    isFollowing,
    userId
})

export const getUsers = (pageSize: number, currentPage = 1):ThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true)); // Enable <Preloader/>

    let data = await usersAPI.getUsersAPI(pageSize, currentPage);
    dispatch(toggleIsFetching(false)); // Disable <Preloader/>
    dispatch(setUsers(data.items)); // Add users array in state
    dispatch(setTotalUsersCount(data.totalCount)); // Change amount of all registred users
    dispatch(setCurrentPage(currentPage)); // Change number of current page
}


export const unfollow = (userId:number):ThunkType => async (dispatch) => {
    let data = await usersAPI.deleteFollow(userId);

    if (data.resultCode !== 0) {
        console.error('Server error(deleteFollow)');
        return;
    }
    dispatch(toggleFollow(userId));
    dispatch(followingInProgress(false, userId));

}

export const follow = (userId:number):ThunkType => async (dispatch) => {
    let data = await usersAPI.postFollow(userId);

    if (data.resultCode !== 0) {
        console.error('Server error(postFollow)');
        return;
    }
    dispatch(toggleFollow(userId));
    dispatch(followingInProgress(false, userId));

}

export default userReducer
