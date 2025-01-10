"use client";
import React, { useEffect } from "react";
import useProductStore from "./store";
import ProductCard from "../component/ProductCard";

function page() {
  const {
    priceRange,
    rating,
    brands,
    categories,
    discount,
    setProducts,
    products,
    filter,
  } = useProductStore((state) => state);
  const fetchProducts = async () => {
    const { products } = await fetch(
      "https://dummyjson.com/products?limit=0"
    ).then((res) => res.json());
    setProducts(products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (filter) {
    }
  }, [filter]);
  return (
    <div className="grid grid-cols-1 gap-4 p-6">
      {products.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </div>
  );
}

export default page;
