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
    setPostProcessData,
    products,
    filter,
    setFilter,
    fetchProducts,
  } = useProductStore((state) => state);
  const { setIsLoading } = useGlobalStore((state) => state);
  const [filteredList, setFilteredList] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState({});
  const [page, setPage] = useState(0);
  const { user } = useUser();
  const { fetchUserCart } = useCartStore((state) => state);

  const handleAddToCartPopup = (product) => {
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
    let limit = 20;
    fetchProducts(products, limit, page);
  }, [page]);

  useEffect(() => {
    if (products.length > 0) {
      setPostProcessData(products);
      setFilteredList(products);
      setIsLoading(false);
    }
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
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 p-6">
        {filteredList.map((product, index) => {
          return (
            <ProductCard
              product={product}
              key={product.id}
              handleAddToCartPopup={handleAddToCartPopup}
              setIsLoading={setIsLoading}
              isLast={index === products.length - 1}
              newLimit={() => setPage(page + 20)}
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
