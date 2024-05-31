import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getItem } from "../Storage";
import { v4 as uuidv4 } from 'uuid';

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (cart) => {
        const oldOrder = get().orders;
        oldOrder.push({
            cart,
            status: 'pending',
            orderId: uuidv4(),
            email: getItem('currentUser').email,
            name: getItem('currentUser').name
        })
        set({
          orders: [...oldOrder],
        });
      },
      completeOrder: (orderId) => {
        const orderList = get().orders;
        orderList.forEach(item => {
            if(item.orderId === orderId) {
                item.status = 'done';
            }
        });
        set({
          orders: [...orderList],
        });
      },
      cancelOrder: (orderId) => {
        const orderList = get().orders;
        orderList.forEach(item => {
            if(item.orderId === orderId) {
                item.status = 'cancelled';
            }
        });
        set({
          orders: [...orderList],
        });
      },
    }),
    {
      name: "order-store",
    }
  )
);
