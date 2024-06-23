export default function PurchaseSection() {
    return (
      <div className="bg-white p-4 shadow rounded-lg mt-4 lg:mt-0 lg:ml-4">
        <div className="text-lg text-gray-600 line-through">$200,000.00</div>
        <div className="text-xl text-red-500">34% OFF</div>
        <div className="text-2xl font-bold text-gray-800">COP 108,285.23</div>
        <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">Buy now</button>
        <button className="mt-2 w-full border border-green-500 text-green-500 py-2 rounded-lg hover:bg-green-50">Add to cart</button>
        <a href="/" className="block mt-2 text-center text-green-500">Return to the store</a>
      </div>
    );
  }
  