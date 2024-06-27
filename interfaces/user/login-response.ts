export interface LoginResponse {
    token: string,
    payload:{
        userid: string,
        email: string,
        role: string
    }
}