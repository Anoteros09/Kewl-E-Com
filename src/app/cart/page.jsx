"use client";
import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import useCartStore from "../store/cart";
import useProductStore from "../store/products";
import CartCard from "../component/CartCard";
import useGlobalStore from "../store/global";

function page() {
  const { cart } = useCartStore((state) => state);
  const { products, productsById, fetchProducts } = useProductStore(
    (state) => state
  );
  const { setIsLoading } = useGlobalStore((state) => state);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [products]);
  return (
    <Container>
      <p className="text-2xl font-bold mb-6 mt-4 text-gray-400 border-b-2 border-gray-500 pb-2">
        Cart Summary
      </p>
      <Box>
        {cart
          .sort((a, b) => a.product_id - b.product_id)
          .map((item) => (
            <CartCard
              product={{ ...item, ...productsById[item.product_id] }}
              key={item.product_id}
              setIsLoading={setIsLoading}
            />
          ))}
      </Box>
    </Container>
  );
}

export default page;
