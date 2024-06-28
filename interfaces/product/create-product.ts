//This interface is a DTO that contains different fields from its entity
export interface CreateProduct {
    name: string;
    description: string;
    price: number;
    stock: number;
    keywords?: string[];
    discount?: number;
}