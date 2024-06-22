export interface Product {
    productid: string;
    name: string;
    imageurls?: string[];
    description?: string;
    price: number;
    stock: number;
    rating: number;
    discount?: number;
    createdat: Date;
    deletedat?: Date;
    lastmodifiedby?: string;
    lastmodifiedat?: Date;
}