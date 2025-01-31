import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import React from "react";

function CartCard({ product, setIsLoading }) {
  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);
  const handleDelete = (product_id) => {
    console.log("deleted product_id", product_id);
  };
  return (
    <div className="mb-4 shadow-lg rounded-lg p-4 flex md:flex-row flex-col items-start space-x-4 bg-neutral1">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-56 h-56 object-cover rounded-lg"
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link
            href={`product/${product.id}`}
            onClick={() => setIsLoading(true)}
            className="font-bold mb-4 text-xl"
          >
            {product.title}
          </Link>
          <hr className="border-t-2 border-gray-300 mb-4" />

          <p className="text-foreground opacity-75 mb-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-lg font-semibold">
              ${product.price}{" "}
              <span className="line-through text-gray-400">
                ${originalPrice}
              </span>
            </p>
            <p className="text-green-600">{product.discountPercentage}% OFF</p>
          </div>
          <p className="text-foreground opacity-75 mt-4 flex justify-between">
            Quantity: {product.quantity}
            <button
              className="self-end text-red-600 hover:text-red-800"
              onClick={() => handleDelete(product.id)}
            >
              <DeleteIcon />
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
