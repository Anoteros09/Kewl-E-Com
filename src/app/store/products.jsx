import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  products: [],
  priceRange: [0, 1],
  selPriceRange: [0, 1],
  rating: 1.0,
  brands: [],
  selBrands: [],
  categories: [],
  selCategories: [],
  discount: 0.0,
  filter: false,
  searchKeyword: "",
};

const useProductStore = create(
  devtools(
    (set) => ({
      ...initialState,
      setProducts: (products) => {
        let filterDefaults = {
          priceRange: [0, 1],
          brands: [],
          categories: [],
        };
        products.forEach((product) => {
          filterDefaults.brands.includes(product.brand) ||
          typeof product.brand != "string"
            ? null
            : filterDefaults.brands.push(product.brand);

          filterDefaults.categories.includes(product.category) ||
          typeof product.category != "string"
            ? null
            : filterDefaults.categories.push(product.category);
          product.price > filterDefaults.priceRange[1]
            ? (filterDefaults.priceRange[1] = product.price)
            : product.price < filterDefaults.priceRange[0]
            ? (filterDefaults.priceRange[0] = product.price)
            : null;
        });
        set({
          products,
          ...filterDefaults,
          selPriceRange: filterDefaults.priceRange,
        });
      },
      setSelPriceRange: (selPriceRange) => set({ selPriceRange }),
      setRating: (rating) => set({ rating }),
      setSelBrands: (selBrands) => set({ selBrands }),
      setSelCategories: (selCategories) => set({ selCategories }),
      setDiscount: (discount) => set({ discount }),
      setFilter: (filter) => set({ filter }),
      setSearchKeyword: (searchKeyword) => set({ searchKeyword }),
      reset: () => set({ ...initialState }),
    }),
    { name: "Products" }
  )
);

export default useProductStore;
