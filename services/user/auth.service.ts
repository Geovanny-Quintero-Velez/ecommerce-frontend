import { User } from '@/interfaces/user/user';
import { CreateUser } from '@/interfaces/user/create-user';


export class AuthService {

    sampleUsers: User[] = [
        {
        userid: '1',
        email: 'myemail@email.com',
        name: 'John',
        lastname: 'Doe',
        birthdate: new Date(),
        password: '123456'
        }
    ]


    public async login (email: string, password: string) {
        const foundUser = this.sampleUsers.find(user => user.email === email && user.password === password);
        if (!foundUser) {
            throw new Error('User not found');
        }
        return foundUser;
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