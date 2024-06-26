//This interface is a DTO that contains different fields from its entity
export interface User {
    userid: string,
    email: string,
    name: string,
    lastname: string,
    birthdate: Date,
    password: string,
    role?: string,
    username?: string,
    createdat?: Date,
    deletedat?: Date
}