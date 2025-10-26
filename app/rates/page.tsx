'use client';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';
import RatesList from '@/components/RatesList/RatesList';
import Loader from '@/components/Loader/Loader';
import Filter from '@/components/Filter/Filter';

import css from './RatesPage.module.css';
import { latestRates } from '@/lib/service/exchangeAPI';
import { useCurrencyState } from '@/lib/stores/currencyStore';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

interface WaveProps {
  text: string;
  effect?: string;
  effectChange?: number;
}

const Wave = dynamic<WaveProps>(() => import('react-animated-text').then((mod) => mod.Wave), {
  ssr: false,
});

export default function RatesPage() {
  const { baseCurrency, rates, setRates, isError, setError, isLoading, setLoading, filter } =
    useCurrencyState();

  useEffect(() => {
    setError(false);
    async function requestCurrencyState() {
      try {
        if (baseCurrency) {
          setLoading(true);
          const rates = await latestRates(baseCurrency);
          const fileredRates = rates
            .filter(([key]) => key !== baseCurrency && key.toLowerCase().includes(filter))
            .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));
          setRates(fileredRates);
        }
      } catch (error) {
        const err = error as ErrorResponse;
        setError(true);
        setRates([]);
        const data = err.response?.data?.error?.message ?? err.message;
        alert(data);
      } finally {
        setLoading(false);
      }
    }
    requestCurrencyState();
  }, [baseCurrency, filter]);

  return (
    <main className={css.main}>
      <Section>
        <Container>
          {isLoading && <Loader />}
          {isError ? (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          ) : (
            <Heading
              info
              title={
                <Wave
                  text={`$ $ $ Current exchange rate for 1 ${baseCurrency || ''} $ $ $`}
                  effect="fadeOut"
                  effectChange={4.0}
                />
              }
            />
          )}
          <Filter />
          {rates.length > 0 && <RatesList rates={rates} />}
        </Container>
      </Section>
    </main>
  );
}
