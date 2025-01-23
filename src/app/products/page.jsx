"use client";
import React, { useEffect, useState } from "react";
import useProductStore from "./store";
import ProductCard from "../component/ProductCard";
import { FilterProducts } from "../utils/FilterProducts";
import { LinearProgress } from "@mui/material";

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
    isLoading,
    setIsLoading,
  } = useProductStore((state) => state);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { products: productsData } = await fetch(
        "https://dummyjson.com/products?limit=0"
      ).then((res) => res.json());
      setProducts(productsData);
      setFilteredList(productsData);
      setIsLoading(false);
    };
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
      setIsLoading(false);
    }
  }, [filter]);
  return isLoading ? (
    <LinearProgress color="secondary" />
  ) : (
    <div className="grid grid-cols-1 gap-4 p-6">
      {filteredList.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </div>
  );
}

export default page;
