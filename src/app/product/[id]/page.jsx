"use client";
import { Avatar, Rating } from "@mui/material";
import useProductStore from "../../store/products";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useGlobalStore from "../../store/global";
import { getCurrentURL, joinPaths } from "../../utils/commonFn";
import { encryptData } from "../../utils/encryptData";
import AddToCart from "../../component/AddToCart";
import { useUser } from "@clerk/nextjs";
import useCartStore from "../../store/cart";

function page() {
  const { id: productId } = useParams();
  const { productsById, fetchProducts } = useProductStore((state) => state);
  const { setIsLoading, isLoading } = useGlobalStore((state) => state);
  const { fetchUserCart } = useCartStore((state) => state);
  const { user } = useUser();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState({});

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
  const handleImageChange = (img) => {
    setIsFading(true);
    setTimeout(() => {
      setSelectedImage(img);
      setIsFading(false);
    }, 300);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (productsById[productId]) {
      setProduct(productsById[productId]);
      setSelectedImage(productsById[productId].images[0]);
      setIsLoading(false);
    }
  }, [productsById]);
  console.log(product);
  return (
    product && (
      <div className="max-w-5xl mx-auto mt-8 p-6 bg-neutral1 text-white rounded-xl shadow-lg">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <img
              src={selectedImage}
              alt={product.title}
              className={`w-full h-96 object-contain rounded-lg shadow-lg bg-neutral transition-opacity duration-300 ease-in-out ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            />
            <div className="flex gap-2 mt-4">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className="w-16 h-16 object-contain rounded cursor-pointer border border-neutral2 hover:border-primary1"
                  onClick={() => handleImageChange(img)}
                />
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div>
            <h1 className="text-3xl font-bold text-primary1">
              {product.title}
            </h1>
            <p className="text-foreground mt-2">{product.description}</p>
            <div className="mt-3">
              <span className="text-2xl font-semibold text-primary2">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-secondary2 text-sm ml-2">
                ({product.discountPercentage}% off)
              </span>
            </div>
            <div className="flex items-center mt-2">
              {/* implement rating */}
              <Rating
                name="read-only"
                value={product.rating}
                readOnly
                precision={0.1}
              />
              <span className="text-foreground ml-2">{product.rating} / 5</span>
            </div>
            <p className="text-secondary1 mt-2 font-medium">
              {product.availabilityStatus}
            </p>
            <p className="text-foreground mt-2 text-sm">SKU: {product.sku}</p>
            <p className="text-foreground text-sm">Brand: {product.brand}</p>
            <p className="text-foreground text-sm">
              Weight: {product.weight} kg
            </p>
            <p className="text-foreground text-sm">
              Dimensions: {product.dimensions.width}" x{" "}
              {product.dimensions.height}" x {product.dimensions.depth}"
            </p>
            <p className="text-foreground text-sm mt-2">
              Warranty: {product.warrantyInformation}
            </p>
            <p className="text-foreground text-sm">
              Shipping: {product.shippingInformation}
            </p>
            <p className="text-foreground text-sm">
              Return Policy: {product.returnPolicy}
            </p>
            <button
              className="mt-4 px-6 py-3 bg-primary1 text-white rounded-lg shadow hover:bg-primary2 transition"
              onClick={() => handleAddToCartPopup(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-primary1">Customer Reviews</h2>
          <div className="mt-4 space-y-4">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-sm border-foreground"
              >
                <div className="flex items-center mb-2">
                  {/* implement rating */}
                  <span className="ml-2 flex items-center gap-4 text-primary2">
                    <Avatar>
                      {review.reviewerName.split(" ")[0][0] +
                        review.reviewerName.split(" ")[1][0]}
                    </Avatar>
                    {review.reviewerName}
                  </span>
                </div>
                <p className="text-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
        <AddToCart
          open={open}
          setOpen={setOpen}
          modalProduct={modalProduct}
          handleAddToCart={handleAddToCart}
        />
      </div>
    )
  );
}

export default page;
