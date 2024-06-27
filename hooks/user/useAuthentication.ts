import { User } from '@/interfaces/user/user';
import { LoginResponse } from '@/interfaces/user/login-response';
import { AuthService } from '@/services/user/auth.service';
import { CreateUser } from '@/interfaces/user/create-user';
import Cookies from 'js-cookie';

export const useAuthentication = () => {
    const authService = new AuthService("http://localhost:3000");

    const login = async (email: string, password: string) => {
        const user = await authService.login(email, password);
        if(user){
            if (user.token) {
                Cookies.set('currentUser', JSON.stringify(user));
                localStorage.setItem('token', user.token);
            }
        }
        return user as LoginResponse;
    }

    const register = async (user: CreateUser) => {
        const newUser = await authService.register(user);
        return newUser as User;
    }

    const getMe = async (userid: string) => {
        const me = await authService.getMe(userid);
        return me as User;
    }

    const logout = () => {
        Cookies.remove('currentUser');
        localStorage.removeItem('token');
    }

    return {login, register, getMe, logout}
}