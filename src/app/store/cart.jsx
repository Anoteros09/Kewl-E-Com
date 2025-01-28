import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getCurrentURL, joinPaths } from "../utils/commonFn";
import { encryptData } from "../utils/encryptData";

const initialState = {
  cart: [],
  total: 0,
};

const useCartStore = create(
  devtools(
    (set) => ({
      ...initialState,
      setCart: (cart) => set({ cart }),
      fetchUserCart: async (userId) => {
        const path = getCurrentURL();
        const url = joinPaths(path, "api/cart/get_cart");
        const token = encryptData({ userId });
        const resp = await fetch(url, {
          method: "POST",
          body: JSON.stringify({ payload: token }),
        });
        const data = await resp.json();
        set({ cart: data, total: data.length });
      },
      setTotal: (total) => set({ total }),
      reset: () => set({ ...initialState }),
    }),
    { name: "Cart" }
  )
);

export default useCartStore;
