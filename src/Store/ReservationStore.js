import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useReservationStore = create(
  persist(
    (set, get) => ({
      reservations: [],
      add: (item) => {
        const newArray = [...get().reservations];
        newArray.push(item);
        set({
            reservations: newArray,
        });
      },
    }),
    {
      name: "reservation-store",
    }
  )
);
