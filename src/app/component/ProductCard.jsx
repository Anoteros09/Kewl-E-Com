import { Rating } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

function ProductCard({
  product,
  handleAddToCartPopup,
  setIsLoading,
  isLast,
  newLimit,
}) {
  const cardRef = useRef();
  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast]);

  return (
    <div
      key={product.id}
      className="flex p-4 rounded-lg bg-neutral1"
      ref={cardRef}
    >
      <div className="flex justify-center 2xl:flex-row flex-col">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-48 h-48 bg-transparent rounded-lg"
        />

        <div className="flex flex-col items-start justify-between ml-4">
          <div>
            <Link
              href={`product/${product.id}`}
              onClick={() => setIsLoading(true)}
              className="text-xl font-semibold text-foreground"
            >
              {product.title}
            </Link>
            <p className="text-sm">
              By <span className="font-bold">{product.brand}</span>
            </p>
            <p className="text-foreground mt-2 text-2xl">
              ${product.price}{" "}
              <span className="text-base">
                ({product.discountPercentage}% off)
              </span>
            </p>
            <Rating
              name="read-only"
              value={product.rating}
              readOnly
              precision={0.1}
            />
          </div>
          <button
            className="px-4 py-2 bg-primary1 text-white font-semibold rounded-md mt-2 hover:bg-[#005F9F] transition"
            onClick={() => handleAddToCartPopup(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
