import axios from "axios";
import {ProfileType} from "../types/types";

const BASE_URL =  `https://social-network.samuraijs.com/api/1.0/`



const instance = axios.create({
    baseURL:BASE_URL,
    withCredentials: true,
    headers: {
        'API-KEY': 'dbf5504c-f2e0-4dbe-bf14-76c4460daab1'
    }
})


export const usersAPI = {

    getUsersAPI(pageSize:number, currentPage:number) {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`)
            .then(response => response.data)
    },
    postFollow(userId:number) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
    deleteFollow(userId:number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    }
}


export const profileAPI = {
    getUsersProfile(userId:number) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatusAPI(userId:number) {
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatusAPI(status:string) {
        return instance.put('profile/status', {status: status});
    },
    changePhoto(file:any) {
        const formData = new FormData();
        formData.append('image', file);
        return instance.put('profile/photo', formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then(response => response.data)
    },
    putProfile(profile:ProfileType) {
        return instance.put('profile',profile)
    }

}


interface GetAuthResponseType {
    data: { id:number, login: string, email:string }
    resultCode: number
    messages: Array<string>
}

interface LoginResponseType {
    resultCode: number
    messages: Array<string>
    data: { userId: number }
}

export const authAPI = {
    getAuthAPI() {
        return instance.get<GetAuthResponseType>(`auth/me`)
            .then(response => response.data)
    },
    login(email:string, password:string, rememberMe:boolean, captcha:string | null = null) {
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete('auth/login')
            .then(response => response.data)
    }
}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get('security/get-captcha-url')
            .then(response => response.data)
    }
}
