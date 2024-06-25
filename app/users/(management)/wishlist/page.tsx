import Wishlist from '@/components/users/management/wishlist/Wishlist';

// Datos de ejemplo
const products = [
    {
        productid: "1",
        name: "Lámpara",
        imageurls: ["/lamp.png"],
        price: 130.00,
        stock: 10,
        rating: 4.5,
        createdat: new Date(),
    },
    {
        productid: "2",
        name: "Plantas",
        imageurls: ["/plants.png"],
        price: 7.50,
        stock: 20,
        rating: 5,
        createdat: new Date(),
    },
    {
        productid: "3",
        name: "Anteojos",
        imageurls: ["/glasses.png"],
        price: 20.00,
        stock: 15,
        rating: 4,
        createdat: new Date(),
    },
];

const WishlistPage = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <Wishlist products={products} />
        </div>
    );
};

export default WishlistPage;
