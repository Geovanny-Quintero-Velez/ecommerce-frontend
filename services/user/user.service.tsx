import {User} from '@/interfaces/user/user';

export class UserService {
    sampleUsers: User[] = [
        {
            userid: "a",
            email: "a@email.com",
            name: "John",
            lastname: "Doe",
            birthdate: new Date(),
            password: "123",
            username: "JohnDoeGod"
        },
        {
            userid: "b",
            email: "b@email.com",
            name: "Mary",
            lastname: "Smidth",
            birthdate: new Date(),
            password: "123",
            username: "MarySmidthGoddes"
        },
        {
            userid: "c",
            email: "c@email.com",
            name: "James",
            lastname: "Morgan",
            birthdate: new Date(),
            password: "123",
            username: "JamesMorganGod"
        }
    ]

    public async getUsers(): Promise<User[]> {
        return this.sampleUsers;
    }

    public async getUserById(userId: string): Promise<User | undefined> {
        return this.sampleUsers.find(user => user.userid === userId);
    }
}