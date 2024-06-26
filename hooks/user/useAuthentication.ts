import { User } from '@/interfaces/user/user';
import { AuthService } from '@/services/user/auth.service';

export const useAuthentication = () => {
    const authService = new AuthService();

    const login = async (email: string, password: string) => {
        const user = await authService.login(email, password);
        return user as User;
    }

    const register = async (user: User) => {
        const newUser = await authService.register(user);
        return newUser as User;
    }

    const getMe = async (userid: string) => {
        const me = await authService.getMe(userid);
        return me as User;
    }

    return {login, register, getMe}
}