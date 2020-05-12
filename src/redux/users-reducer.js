import {usersAPI} from "../api/api";

const TOGGLE_FOLLOW = 'my-app/users/TOGGLE_FOLLOW';
/*const UNFOLLOW = 'UNFOLLOW';*/
const SET_USERS = 'my-app/users/SET_USERS';
const SET_CURRENT_PAGE = 'my-app/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'my-app/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'my-app/users/TOGGLE_IS_FETCHING';
const FOLLOWING_IN_PROGRESS = 'my-app/users/FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [
        /*{
            id: 1,
            follow: true,
            name: 'Tupaya Shkura',
            status: 'ya ebu konya',
            location: {city: 'Kiev', country: 'Ukraine'},
            avaURL:'https://lh3.googleusercontent.com/proxy/tTg8M6qD3zJynht3OrnoTphaHUmFvjMSNpxZnMXI2iBSxAboyd4puijhkNk0PPbbuG2pZpsrmR1fVGOHOxgmDJb1l6CnR0BVN6-ZB7JlvEWrZKZIesTx_QTzOEs'
        },
        {
            id: 2,
            follow: false,
            name: 'Penis Detrov',
            status: 'hochu pitsi',
            location: {city: 'Samara', country: 'Russia'},
            avaURL:'data:image/jpeg;base64,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'
        },
        {
            id: 3,
            follow: true,
            name: 'Yura Hoy',
            status: 'sredniy chlen',
            location: {city: 'Piter', country: 'Zhopa'},
            avaURL:'https://24smi.org/public/media/celebrity/2018/05/03/j9kbdbff2h9x-iurii-khoi.jpg'
        }*/
    ],
    totalCount: 0, // Amount of all registred users
    pageSize: 5, // Amount of users on 1 page
    currentPage: 1,
    isFetching: true,
    followedUsersId: [] // On which users follow/unfollow in progress
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FOLLOW: {
            let stateCopy = {
                ...state,
                users: state.users.map(u => {
                    if (action.userId === u.id) {
                        return {...u, followed: !u.followed};
                    }
                    return u;
                })
            };

            return stateCopy;
        }
        /*  case UNFOLLOW: {
              let stateCopy = {
                  ...state,
                  users: state.users.map(u => {
                      if (action.userId === u.id) {
                          return {...u, followed: false};
                      }
                      return u;
                  })
              };
              return stateCopy;
          }*/

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

/*export const unfollowAC = (userId) => ({
    type: UNFOLLOW,
    userId
})*/

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
        console.error('BLYAD FOLLOW SLOMALSYA');
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
                    console.error('BLYAD FOLLOW SLOMALSYA');
                    return;
                }
                dispatch(toggleFollow(userId));
                dispatch(followingInProgress(false, userId));
            })
    }
}


export default userReducer;