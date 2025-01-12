"use client";
import React, { useEffect, useState } from "react";
import useProductStore from "./store";
import ProductCard from "../component/ProductCard";
import { FilterProducts } from "../utils/FilterProducts";

function page() {
  const {
    selPriceRange,
    discount,
    selBrands,
    selCategories,
    rating,
    setProducts,
    products,
    filter,
    setFilter,
  } = useProductStore((state) => state);
  const [filteredList, setFilteredList] = useState([]);
  const fetchProducts = async () => {
    const { products: productsData } = await fetch(
      "https://dummyjson.com/products?limit=0"
    ).then((res) => res.json());
    setProducts(productsData);
    setFilteredList(productsData);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (filter) {
      setFilteredList(
        FilterProducts(products, {
          selPriceRange,
          discount,
          selBrands,
          selCategories,
          rating,
        })
      );
      setFilter(false);
    }
  }, [filter]);
  return (
    <div className="grid grid-cols-1 gap-4 p-6">
      {filteredList.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </div>
  );
}

export default page;
