import { Product } from "@/interfaces/product/product";

export class ProductService {

    private generateUniqueImageUrl(): string  {
      var randomNumber = Math.floor(Math.random() * 80) + 1;
      var foodNumber = Math.round(Math.random() * 2) + 1;
      var foodName = "";
      switch (foodNumber) {
        case 1:
          foodName = "dosa";
          break;
        case 2:
          foodName = "burger";
          break;
        case 3:
          foodName = "biryani";
          break;
      }
      return `https://foodish-api.com/images/${foodName}/${foodName}${randomNumber}.jpg`;
    }

    sampleProducts: Product[] = [
        {
            productid: "1",
            name: "Producto 1",
            imageurl: this.generateUniqueImageUrl(),
            price: 250000,
            discount: 200000,
            rating: 4.3,
            stock: 10,
            createdat: new Date(),
          },
          {
            productid: "2",
            name: "Producto 2",
            imageurl: this.generateUniqueImageUrl(),
            price: 300000,
            rating: 3.7,
            stock: 10,
            createdat: new Date(),
          },
          {
            productid: "3",
            name: "Producto 3",
            imageurl: this.generateUniqueImageUrl(),
            price: 25,
            discount: 20,
            rating: 2.5,
            stock: 10,
            createdat: new Date(),
          },
          {
            productid: "4",
            name: "Producto 4",
            imageurl: this.generateUniqueImageUrl(),
            price: 70,
            rating: 4.9,
            stock: 10,
            createdat: new Date(),
          },
          {
            productid: "5",
            name: "Producto 5",
            imageurl: this.generateUniqueImageUrl(),
            price: 60,
            discount: 50,
            rating: 3.2,
            stock: 10,
            createdat: new Date(),
          },
          {
            productid: "6",
            name: "Producto 6",
            imageurl: this.generateUniqueImageUrl(),
            price: 20,
            rating: 1.4,
            stock: 10,
            createdat: new Date(),
          },
          {
            productid: "7",
            name: "Producto 7",
            imageurl: this.generateUniqueImageUrl(),
            price: 45,
            discount: 35,
            rating: 4.6,
            stock: 10,
            createdat: new Date(),
          },
          {
            productid: "8",
            name: "Producto 8",
            imageurl: this.generateUniqueImageUrl(),
            price: 55,
            rating: 3.8,
            stock: 10,
            createdat: new Date(),
          },
    ]
    
    public async getProducts(): Promise<Product[]> {
        return this.sampleProducts;
    }
}