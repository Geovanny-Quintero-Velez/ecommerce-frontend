//This interface is a DTO that contains different fields from its entity
export interface Review {
    reviewid: string,
    userid: string,
    productid: string,
    description: string,
    rate: number,
    createdat?: Date,
    deletedad?: Date
    username: string
    userimageurl?: string
}