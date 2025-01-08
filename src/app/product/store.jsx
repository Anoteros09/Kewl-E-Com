import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  products: [],
  priceRange: [1, 100],
  rating: 4.5,
  brands: [],
  categories: [],
  discount: [],
};

const useProductStore = create(
  devtools(
    (set) => ({
      ...initialState,
      setProducts: (products) => set({ products }),
      setPriceRange: (priceRange) => set({ priceRange }),
      setRating: (rating) => set({ rating }),
      setBrands: (brands) => set({ brands }),
      setCategories: (categories) => set({ categories }),
      setDiscount: (discount) => set({ discount }),
      reset: () => set({ ...initialState }),
    }),
    { store: "Products" }
  )
);

export default useProductStore;
