import { User } from '@/interfaces/user/user';
import { LoginResponse } from '@/interfaces/user/login-response';
import { UserService } from '@/services/user/user.service';
import { CreateUser } from '@/interfaces/user/create-user';

export const useFetchUsers = () => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const userService = new UserService(baseURL);
    
    const fetchUserById = async (userId: string) => {
        const user = await userService.getUserById(userId);
        return user as User;
    }

    return { fetchUserById };
}