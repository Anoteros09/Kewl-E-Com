import React from "react";

function ProductCard({ product }) {
  return (
    <div
      key={product.id}
      className="flex flex-col items-start p-4 rounded-lg bg-neutral2"
    >
      <div className="flex justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-48 h-48 object-fit bg-transparent rounded-lg"
        />

        <div className="flex flex-col items-start justify-between ml-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {product.title}
            </h2>
            <p className="text-sm">
              By <span className="font-bold">{product.brand}</span>
            </p>
            <p className="text-foreground mt-2 text-2xl">
              ${product.price}{" "}
              <span className="text-base">
                ({product.discountPercentage}% off)
              </span>
            </p>
          </div>
          <button className="px-4 py-2 bg-secondary1 text-white font-semibold rounded-md mt-4 hover:bg-[#005F9F] transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
