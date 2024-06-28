export interface Order {
    orderid: string;
    userid: string;
    price: number;
    status: string;
    createdat?: Date;
    deletedat?: Date;
}
