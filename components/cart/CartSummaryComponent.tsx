import { useCart } from '@/context/CartContext';

export default function CartSummaryComponent() {
  const { cart, clearCart } = useCart();

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const serviceFee = 20000; // Puedes ajustar este valor según sea necesario

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-full md:max-w-lg mx-auto md:mx-0 textStandard mt-6 md:mt-0">
      <h2 className="text-xl font-bold text-center mb-4">My shopping</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500"> 🛒 Your cart is empty. Add products to start shopping!</p>
      ) : (
        <div>
          <button className="w-full backgroundSecondary font-bold text-white py-2 rounded mb-4">
              Proceed to checkout
            </button>
          <div className="flex justify-between py-4">
            <p className="text-lg">{totalQuantity} products</p>
            <p className="text-lg">COP {totalPrice.toLocaleString()}</p>
          </div>
          <div className="flex justify-between border-b py-4">
            <p className="text-lg">Service fee</p>
            <p className="text-lg">COP {serviceFee.toLocaleString()}</p>
          </div>
          <div className="flex justify-between border-b py-4 font-bold text-xl">
            <p>Total:</p>
            <p>COP {(totalPrice + serviceFee).toLocaleString()}</p>
          </div>
          <div className="mt-4 text-center">
              <p  className="textStandar">
                Do you want to explore more? <a href="/" className="textSecondary font-bold">Return to the store</a>
              </p>
            </div>
          <button
            onClick={clearCart}
            className="mt-4 w-full backgroundDelete text-white py-2 rounded-lg hover:bg-red-500"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
