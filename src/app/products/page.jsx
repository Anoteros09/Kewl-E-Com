"use client";
import React, { useEffect, useState } from "react";
import useProductStore from "./store";
import ProductCard from "../component/ProductCard";
import { FilterProducts } from "../utils/FilterProducts";
import { LinearProgress } from "@mui/material";
import AddToCart from "../component/AddToCart";

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
  const [open, setOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState({});
  const handleAddToCartPopup = (product) => {
    console.log("Triggered handleAddToCartPopup");
    setOpen(true);
    setModalProduct(product);
  };

  const handleAddToCart = (product, quantity) => {
    console.log(`Added ${quantity} ${product.title} to cart`);
    setOpen(false);
  };

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
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 p-6">
        {filteredList.map((product) => {
          return (
            <ProductCard
              product={product}
              key={product.id}
              handleAddToCartPopup={handleAddToCartPopup}
            />
          );
        })}
      </div>
      <AddToCart
        open={open}
        setOpen={setOpen}
        modalProduct={modalProduct}
        handleAddToCart={handleAddToCart}
      />
    </>
  );
}

export default page;
