import axios from "axios";

export const saveToken = (token: string) => {
    localStorage.setItem("token", token)
}

export const getToken = () => {
    return localStorage.getItem("token")
}

export const removeToken = () => {
    localStorage.removeItem("token")
}

export const axiosRequest = axios.create({
    baseURL: import.meta.env.VITE_API
})

axiosRequest.interceptors.request.use((config: any) => {
    const token = getToken()

    if(token){
        config.headers["Authorization"] = `Bearer ${token}`
    }

    return config
})

axiosRequest.interceptors.response.use(
    (response) => response, 
    (error) => {
        if(error.response?.status == 401){
            removeToken()

            if(typeof window != "undefined" && window.location.pathname != "/login"){
                window.location.href = "/login";
            }
        }

        return Promise.reject(error)
    }
)