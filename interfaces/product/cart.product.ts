export interface CartProduct {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    description: string;
    category: string;
    discountPrice?: number;
    quantity: number; 
}