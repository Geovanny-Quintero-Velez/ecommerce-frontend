import {User} from '@/interfaces/user/user';
import  axios,  {AxiosInstance} from 'axios';

export class UserService {
    protected readonly axios: AxiosInstance;
    public constructor() {
        const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseURL) {
            throw new Error('The NEXT_PUBLIC_BASE_URL environment variable is not defined');
        }

        this.axios = axios.create({
            baseURL: baseURL,
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
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
}