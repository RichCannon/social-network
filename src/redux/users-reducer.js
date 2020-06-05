import {usersAPI} from "../api/api";

const TOGGLE_FOLLOW = 'my-app/users/TOGGLE_FOLLOW';
const SET_USERS = 'my-app/users/SET_USERS';
const SET_CURRENT_PAGE = 'my-app/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'my-app/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'my-app/users/TOGGLE_IS_FETCHING';
const FOLLOWING_IN_PROGRESS = 'my-app/users/FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [],
    totalCount: 0, // Amount of all registred users
    pageSize: 5, // Amount of users on 1 page
    currentPage: 1,
    isFetching: true,
    followedUsersId: [] // On which users follow/unfollow in progress
}


const userReducer = (state = initialState, action) => {
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

export const toggleFollow = (userId) => ({
    type: TOGGLE_FOLLOW,
    userId
})

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
})


export const setUsers = (users) => ({
    type: SET_USERS,
    users
})

export const setTotalUsersCount = (totalCount) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount
})

export const toggleIsFetching = (isFetching) => ({ // Indicator for Preloader
    type: TOGGLE_IS_FETCHING,
    isFetching
})

export const followingInProgress = (isFollowing, userId) => ({ // For disabling FOLLOW button
    type: FOLLOWING_IN_PROGRESS,
    isFollowing,
    userId
})

export const getUsers = (pageSize, currentPage = 1) => async (dispatch) => {
    dispatch(toggleIsFetching(true)); // Enable <Preloader/>

    let data = await usersAPI.getUsersAPI(pageSize, currentPage);
    dispatch(toggleIsFetching(false)); // Disable <Preloader/>
    dispatch(setUsers(data.items)); // Add users array in state
    dispatch(setTotalUsersCount(data.totalCount)); // Change amount of all registred users
    dispatch(setCurrentPage(currentPage)); // Change number of current page
}


export const unfollow = (userId) => async (dispatch) => {
    let data = await usersAPI.deleteFollow(userId);

    if (data.resultCode !== 0) {
        console.error('Server error(deleteFollow)');
        return;
    }
    dispatch(toggleFollow(userId));
    dispatch(followingInProgress(false, userId));

}

export const follow = (userId) => {
    return (dispatch) => {
        usersAPI.postFollow(userId)
            .then(data => {
                if (data.resultCode !== 0) {
                    console.error('Server error(postFollow)');
                    return;
                }
                dispatch(toggleFollow(userId));
                dispatch(followingInProgress(false, userId));
            })
    }
}


export default userReducer;