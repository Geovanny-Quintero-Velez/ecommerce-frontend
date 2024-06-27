import {User} from '@/interfaces/user/user';
import  axios,  {AxiosInstance} from 'axios';

export class UserService {
    protected readonly axios: AxiosInstance;
    public constructor(url: string) {
        this.axios = axios.create(
            {
                baseURL: url,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                timeout: 3000,
                timeoutErrorMessage: 'Request timed out'
            }
        )
    }

    sampleUsers: User[] = [
        {
            userid: "a",
            email: "a@email.com",
            name: "John",
            lastname: "Doe",
            birthdate: new Date(),
            username: "JohnDoeGod"
        },
        {
            userid: "b",
            email: "b@email.com",
            name: "Mary",
            lastname: "Smidth",
            birthdate: new Date(),
            username: "MarySmidthGoddes"
        },
        {
            userid: "c",
            email: "c@email.com",
            name: "James",
            lastname: "Morgan",
            birthdate: new Date(),
            username: "JamesMorganGod"
        }
    ]

    public async getUsers(): Promise<User[]> {
        return this.sampleUsers;
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
                throw error;
            }
        }
    }
}