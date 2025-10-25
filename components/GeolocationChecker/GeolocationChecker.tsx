'use client';

import { useEffect } from 'react';

import { getUserInfo } from '@/lib/service/opencagedataApi';
import { useCurrencyState } from '@/lib/stores/currencyStore';

export default function GeolocationChecker() {
  const { setBaseCurrency, baseCurrency, hasHydrated } = useCurrencyState();

  useEffect(() => {
    console.log('hasHydrated', hasHydrated);
    console.log('baseCurrency', baseCurrency);

    if (hasHydrated || baseCurrency) return;

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async ({ coords }: GeolocationPosition) => {
      const data = await getUserInfo(coords);

      setBaseCurrency(data.results[0].annotations.currency.iso_code);
      return data.results[0].annotations.currency.iso_code;
    };

    const error = (error: GeolocationPositionError) => {
      setBaseCurrency('USD');
      alert(`${error.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return null;
}
