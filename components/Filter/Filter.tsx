'use client';

import { useCurrencyState } from '@/lib/stores/currencyStore';
import styles from './Filter.module.css';
import { useDebouncedCallback } from 'use-debounce';

export default function Filter() {
  const setFilter = useCurrencyState((state) => state.setFilter);
  const filter = useCurrencyState((state) => state.filter);

  const debouncedSetFilter = useDebouncedCallback((value: string) => {
    setFilter(value);
  }, 500);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    debouncedSetFilter(value);
  }

  return (
    <input
      onChange={handleChange}
      type="text"
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      defaultValue={filter}
    />
  );
}
