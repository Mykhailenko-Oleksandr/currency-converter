// lib\stores\currencyStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CurrencyState = {
  baseCurrency: string | null;
  setBaseCurrency: (currency: string) => void;
  hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
  exchangeInfo: null | ExchangeInfo;
  setExchangeInfo: (data: ExchangeInfo | null) => void;
  isLoading: boolean;
  setLoading: (state: boolean) => void;
  isError: boolean;
  setError: (state: boolean) => void;
  rates: RatesObj[] | [];
  setRates: (rates: RatesObj[]) => void;
  filter: string;
  setFilter: (newFilter: string) => void;
};

export const useCurrencyState = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: null,
      setBaseCurrency: (newCurrency) => set(() => ({ baseCurrency: newCurrency })),
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: !state }),
      exchangeInfo: null,
      setExchangeInfo: (data) => set({ exchangeInfo: data }),
      isLoading: false,
      setLoading: (state) => set({ isLoading: state }),
      isError: false,
      setError: (state) => set({ isError: state }),
      rates: [],
      setRates: (rates) => set({ rates: rates }),
      filter: '',
      setFilter: (newFilter) => set({ filter: newFilter }),
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
