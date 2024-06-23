export default function ProductSkeleton() {
    return (
      <div className="flex flex-col lg:flex-row p-4 bg-white shadow rounded-lg animate-pulse">
        <div className="w-full lg:w-2/3 p-4">
          <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
          <div className="mt-4 space-y-2">
            <div className="w-full h-16 bg-gray-300 rounded-lg"></div>
            <div className="w-full h-16 bg-gray-300 rounded-lg"></div>
            <div className="w-full h-16 bg-gray-300 rounded-lg"></div>
            <div className="w-full h-16 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 p-4 space-y-2">
          <div className="w-2/3 h-8 bg-gray-300 rounded-lg"></div>
          <div className="flex items-center mt-2 space-x-2">
            <div className="w-24 h-4 bg-gray-300 rounded-lg"></div>
            <div className="w-16 h-4 bg-gray-300 rounded-lg"></div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="w-full h-4 bg-gray-300 rounded-lg"></div>
            <div className="w-full h-4 bg-gray-300 rounded-lg"></div>
            <div className="w-full h-4 bg-gray-300 rounded-lg"></div>
            <div className="w-full h-4 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }
  