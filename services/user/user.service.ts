import {User} from '@/interfaces/user/user';
import  axios,  {AxiosInstance} from 'axios';
import { getAuthHeader } from '@/utils/auth/get-auth-header';

export class UserService {
    protected readonly axios: AxiosInstance;
    public constructor() {
        const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseURL) {
            throw new Error('The NEXT_PUBLIC_BASE_URL environment variable is not defined');
        }
        const { Authorization } = getAuthHeader();
        console.log('Authorization', Authorization)
        this.axios = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
                Authorization
            },
            timeout: 3000,
            timeoutErrorMessage: 'Request timed out'
        });
    }

    public async getUserById(userId: string): Promise<User | undefined> {
        try {
            const response = await this.axios.get(`${this.axios.defaults.baseURL}/user/${userId}`);
            return response.data as User;
        }catch (error: any) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw new Error('An unexpected error occurred while capturing the user data');
        }
        }
    }

    public async getAllUsers(): Promise<User[] | undefined> {
        try {
            const response = await this.axios.get(`${this.axios.defaults.baseURL}/user`);
            return response.data as User[];
        }catch (error: any) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw new Error('An unexpected error occurred while capturing the user data');
        }
        }
    }

    public async createUser(user: User): Promise<User | undefined> {
        try {
            const response = await this.axios.post(`${this.axios.defaults.baseURL}/user`, user);
            return response.data as User;
        }catch (error: any) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw new Error('An unexpected error occurred while creating a new user');
        }
        }
    }

    public async updateUser(user: User): Promise<User | undefined> {
        try {
            const response = await this.axios.patch(`${this.axios.defaults.baseURL}/user/${user.userid}`, user);
            return response.data as User;
        }catch (error: any) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw new Error('An unexpected error occurred while deleting an existing user');
        }
        }
    }

    public async deleteUser(userId: string): Promise<void> {
        try {
            await this.axios.delete(`${this.axios.defaults.baseURL}/user/${userId}`);
        }catch (error: any) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else {
            throw new Error('An unexpected error occurred while deleting an existing user');
        }
        }
    }
}