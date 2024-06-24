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
        name: "Gourmet Delight",
        imageurls: this.generateUniqueImageUrls(),
        price: 250000,
        discount: 200000,
        rating: 4.3,
        stock: 10,
        createdat: new Date(),
        reviewscount: 3,
        description: "A unique culinary experience, perfect for any special occasion. Flavor and quality in every bite."
      },
      {
        productid: "2",
        name: "Exquisite Treat",
        imageurls: this.generateUniqueImageUrls(),
        price: 300000,
        rating: 3.7,
        stock: 10,
        createdat: new Date(),
        reviewscount: 2,
        description: "Enjoy a dish made with fresh ingredients and a touch of love. Ideal for sharing with loved ones."
      },
      {
        productid: "3",
        name: "Tasty Pleasure",
        imageurls: this.generateUniqueImageUrls(),
        price: 25,
        discount: 20,
        rating: 2.5,
        stock: 10,
        createdat: new Date(),
        description: "A delicious bite that combines tradition and flavor. Perfect for a quick but satisfying meal."
      },
      {
        productid: "4",
        name: "Delicate Taste",
        imageurls: this.generateUniqueImageUrls(),
        price: 70,
        rating: 4.9,
        stock: 10,
        createdat: new Date(),
        description: "A carefully prepared dish to offer an exceptional taste experience. A delight for the palate."
      },
      {
        productid: "5",
        name: "Savory Charm",
        imageurls: this.generateUniqueImageUrls(),
        price: 60,
        discount: 50,
        rating: 3.2,
        stock: 10,
        createdat: new Date(),
        description: "A perfect blend of flavors that will keep you coming back for more. Ideal for any time of day."
      },
      {
        productid: "6",
        name: "Delicious Bite",
        imageurls: this.generateUniqueImageUrls(),
        price: 20,
        rating: 1.4,
        stock: 10,
        createdat: new Date(),
        description: "A simple yet flavorful bite. Perfect for a quick and delicious meal."
      },
      {
        productid: "7",
        name: "Artisan Flavor",
        imageurls: this.generateUniqueImageUrls(),
        price: 45,
        discount: 35,
        rating: 4.6,
        stock: 10,
        createdat: new Date(),
        description: "Handmade with high-quality ingredients. A delicious and authentic option for any occasion."
      },
      {
        productid: "8",
        name: "Delicious Feast",
        imageurls: this.generateUniqueImageUrls(),
        price: 55,
        rating: 3.8,
        stock: 10,
        createdat: new Date(),
        description: "A complete meal that satisfies the appetite and delights the senses. Perfect for family sharing."
      },
    ];
    
    
    public async getProducts(): Promise<Product[]> {
        return this.sampleProducts;
    }

    public async getProductById(productId: string): Promise<Product | undefined> {
        return this.sampleProducts.find(product => product.productid === productId);
    }
}