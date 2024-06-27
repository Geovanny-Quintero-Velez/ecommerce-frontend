import { User } from '@/interfaces/user/user';
import { CreateUser } from '@/interfaces/user/create-user';
import  axios,  {AxiosInstance} from 'axios';


export class AuthService {

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
        userid: '1',
        email: 'myemail@email.com',
        name: 'John',
        lastname: 'Doe',
        birthdate: new Date(),
        }
    ]


    public async login (email: string, password: string): Promise<any> {
        console.log("email: ", email);
        console.log("password: ", password);
        try {
            const response = await this.axios.post(`${this.axios.defaults.baseURL}/auth/login`, {
                email: email,
                password: password
            });
            return response.data;
        }catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                throw new Error(errorMessage);
            } else {
                throw error;
            }
        }
    }


    public async register (user: CreateUser) {
        const newUser: User = {
            userid: (this.sampleUsers.length + 1).toString(),
            ...user
        }
        this.sampleUsers.push(newUser);
        return newUser
    }

    public async getMe (userid: string) {
        const foundUser = this.sampleUsers.find(user => user.userid === userid);
        return foundUser;
    }
}