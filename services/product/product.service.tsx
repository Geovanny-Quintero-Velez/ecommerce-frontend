import { Product } from "@/interfaces/product/product";

export class ProductService {

    private generateUniqueImageUrls(): string[]  {
      var randomNumber = Math.floor(Math.random() * 80) + 1;
      var foodNumber = Math.round(Math.random() * 2) + 1;
      var foodName = "";
      switch (foodNumber) {
        case 1:
          foodName = "dosa";
          break;
        case 2:
          foodName = "biryani";
          break;
        case 3:
          foodName = "burger";
          break;
      }
      var baseUrl = `https://foodish-api.com/images/${foodName}/${foodName}`;
      var images = [
        `${baseUrl}${randomNumber}.jpg`,
        `${baseUrl}${randomNumber+1}.jpg`,
        `${baseUrl}${randomNumber+2}.jpg`,]
      return images;
    }

    sampleProducts: Product[] = [
        {
            productid: "1",
            name: "Producto 1",
            imageurls: this.generateUniqueImageUrls(),
            price: 250000,
            discount: 200000,
            rating: 4.3,
            stock: 10,
            createdat: new Date(),
            reviewscount: 3
          },
          {
            productid: "2",
            name: "Producto 2",
            imageurls: this.generateUniqueImageUrls(),
            price: 300000,
            rating: 3.7,
            stock: 10,
            createdat: new Date(),
            reviewscount: 2
          },
          {
            productid: "3",
            name: "Producto 3",
            imageurls: this.generateUniqueImageUrls(),
            price: 25,
            discount: 20,
            rating: 2.5,
            stock: 10,
            createdat: new Date(),
          },
          {
            productid: "4",
            name: "Producto 4",
            imageurls: this.generateUniqueImageUrls(),
            price: 70,
            rating: 4.9,
            stock: 10,
            createdat: new Date(),
          },
          {
            productid: "5",
            name: "Producto 5",
            imageurls: this.generateUniqueImageUrls(),
            price: 60,
            discount: 50,
            rating: 3.2,
            stock: 10,
            createdat: new Date(),
          },
          {
            productid: "6",
            name: "Producto 6",
            imageurls: this.generateUniqueImageUrls(),
            price: 20,
            rating: 1.4,
            stock: 10,
            createdat: new Date(),
          },
          {
            productid: "7",
            name: "Producto 7",
            imageurls: this.generateUniqueImageUrls(),
            price: 45,
            discount: 35,
            rating: 4.6,
            stock: 10,
            createdat: new Date(),
          },
          {
            productid: "8",
            name: "Producto 8",
            imageurls: this.generateUniqueImageUrls(),
            price: 55,
            rating: 3.8,
            stock: 10,
            createdat: new Date(),
          },
    ]
    
    public async getProducts(): Promise<Product[]> {
        return this.sampleProducts;
    }

    public async getProductById(productId: string): Promise<Product | undefined> {
        return this.sampleProducts.find(product => product.productid === productId);
    }
}