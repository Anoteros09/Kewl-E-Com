import React from "react";

async function page() {
  const { products } = await fetch(
    "https://dummyjson.com/products?limit=0"
  ).then((res) => res.json());
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {products.map((product) => {
        return (
          <div
            key={product.id}
            className="flex flex-col items-center p-4 rounded-lg shadow-md shadow-gray-200 bg-gray-500"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-48 h-48 object-fit bg-transparent rounded-lg"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              {product.title}
            </h2>
            <p className="text-gray-500 mt-2">${product.price}</p>
            <button className="px-4 py-2 bg-[#007BFF] text-white font-semibold rounded-md mt-4 hover:bg-[#005F9F] transition">
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default page;
