"use client";
import React, { useEffect, useState } from "react";
import useProductStore from "../store/products";
import ProductCard from "../component/ProductCard";
import { FilterProducts } from "../utils/FilterProducts";
import AddToCart from "../component/AddToCart";
import { useUser } from "@clerk/nextjs";
import { getCurrentURL, joinPaths } from "../utils/commonFn";
import { encryptData } from "../utils/encryptData";
import useCartStore from "../store/cart";
import useGlobalStore from "../store/global";

function page() {
  const {
    selPriceRange,
    discount,
    selBrands,
    selCategories,
    rating,
    fetchProducts,
    products,
    filter,
    setFilter,
  } = useProductStore((state) => state);
  const { setIsLoading } = useGlobalStore((state) => state);
  const [filteredList, setFilteredList] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState({});
  const { user } = useUser();
  const { fetchUserCart } = useCartStore((state) => state);

  const handleAddToCartPopup = (product) => {
    console.log("Triggered handleAddToCartPopup");
    setOpen(true);
    setModalProduct(product);
  };

  const handleAddToCart = async (product, quantity) => {
    try {
      const path = getCurrentURL();
      const url = joinPaths(path, "api/cart/update_cart");
      const token = await encryptData({
        userId: user.id,
        productId: product.id,
        quantity,
        netPrice: product.price * quantity,
        unitPrice: product.price,
      });
      fetch(url, {
        method: "POST",
        body: JSON.stringify({ payload: token }),
      })
        .catch((error) => console.info(error))
        .finally(() => {
          fetchUserCart(user.id);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setFilteredList(products);
    }
    setIsLoading(false);
  }, [products]);

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
  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 p-6">
        {filteredList.map((product) => {
          return (
            <ProductCard
              product={product}
              key={product.id}
              handleAddToCartPopup={handleAddToCartPopup}
              setIsLoading={setIsLoading}
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
