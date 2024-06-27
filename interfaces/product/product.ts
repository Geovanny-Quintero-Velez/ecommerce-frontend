//This interface is a DTO that contains different fields from its entity
export interface Product {
    productid: string;
    name: string;
    imageurls?: string[];
    description?: string;
    price: number;
    stock: number;
    rating: number;
    reviewscount?: number;
    keywords?: string[];
    discount?: number;
    createdat: Date;
    deletedat?: Date;
    lastmodifiedby?: string;
    lastmodifiedat?: Date;
}