export interface OrderDetail {
    orderdetailid?: string;
    orderid: string;
    productid: string;
    quantity: number;
    price: number;
    createdat?: Date;
    deletedat?: Date;
}
