"use client";
import React, { useEffect } from "react";
import useProductStore from "./store";
import ProductCard from "../component/productCard";

function page() {
  const setProducts = useProductStore((state) => state.setProducts);
  const products = useProductStore((state) => state.products);
  const fetchProducts = async () => {
    const { products } = await fetch(
      "https://dummyjson.com/products?limit=0"
    ).then((res) => res.json());
    setProducts(products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="grid grid-cols-1 gap-4 p-6">
      {products.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </div>
  );
}

export default page;
