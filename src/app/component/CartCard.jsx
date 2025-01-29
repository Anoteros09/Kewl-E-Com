import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

function CartCard({ product }) {
  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);
  const handleDelete = (product_id) => {
    console.log("deleted product_id", product_id);
  };
  return (
    <div className="mb-4 shadow-lg rounded-lg p-4 flex flex-row items-start space-x-4 bg-neutral1">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-56 h-56 object-cover rounded-lg"
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h5 className="font-bold mb-4">{product.title}</h5>
          <hr className="border-t-2 border-gray-300 mb-4" />

          <p className="text-gray-300 mb-2">{product.description}</p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-lg font-semibold">
              ${product.price}{" "}
              <span className="line-through text-gray-400">
                ${originalPrice}
              </span>
            </p>
            <p className="text-green-600">{product.discountPercentage}% OFF</p>
          </div>
          <p className="text-gray-300 mt-4">Quantity: {product.quantity}</p>
        </div>
        <button
          className="mt-4 self-start text-red-600 hover:text-red-800"
          onClick={() => handleDelete(product.id)}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default CartCard;
