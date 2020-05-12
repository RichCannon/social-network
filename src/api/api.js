import * as axios from "axios";


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': 'dbf5504c-f2e0-4dbe-bf14-76c4460daab1'
    }
})


export const usersAPI = {

    getUsersAPI(pageSize, currentPage) {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`)
            .then(response => response.data)
    },
    postFollow(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
    deleteFollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    }
}


export const profileAPI = {
    getUsersProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatusAPI(userId) {
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatusAPI(status) {
        return instance.put('profile/status',{status: status});
    }
}

export const authAPI = {
    getAuthAPI() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    login(email, password, rememberMe) {
        return instance.post('auth/login',{email, password, rememberMe})
            .then(response => response.data)
    },
    logout() {
        return instance.delete('auth/login')
            .then(response => response.data)
    }
}

