import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      count: 0,
      total_price: 0,
      cart: [],
      addToCart: (item) => {
        const { name } = item;
        console.log(name);
        const cart = [...get().cart];
        const index = cart.findIndex((item) => item.name === name);
        if (index !== -1) {
          cart[index].count++;
        } else {
          cart.push({
            ...item,
            count: 1,
          });
        }
        console.log(index);
        console.log(cart);
        set({
          cart,
          count: get().count + 1,
          total_price: get().total_price + Number(item.price),
        });
      },
      removeFromCart: (itemName) => {
        const cart = [...get().cart];
        const index = cart.findIndex((item) => item.name === itemName);
        if (index !== -1) {
          if (cart[index].count > 1) {
            cart[index].count--;
            set({
              cart,
              count: Math.max(get().count - 1, 0),
              total_price: Math.max(
                get().total_price - Number(cart[index].price),
                0
              ),
            });
          } else {
            const removedItem = cart.splice(index, 1);
            set({
              cart,
              count: Math.max(get().count - 1, 0),
              total_price: Math.max(
                get().total_price - Number(removedItem[0].price),
                0
              ),
            });
          }
        }
      },
      removeWholeItem: (itemName) => {
        const cart = [...get().cart];
        const index = cart.findIndex((item) => item.name === itemName);
        const removedItem = cart.splice(index, 1);
        set({
          cart,
          count: get().count - removedItem[0].count,
          total_price:
            get().total_price -
            Number(removedItem[0].price) * removedItem[0].count,
        });
      },
      reinitialiseCart: () => {
        set({
          cart: [],
          count: 0,
          total_price: 0,
        });
      }
    }),
    {
      name: "cart-store",
    }
  )
);
