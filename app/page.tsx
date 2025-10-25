'use client';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import Heading from '@/components/Heading/Heading';

import css from './page.module.css';
import ExchangeForm from '@/components/ExchangeForm/ExchangeForm';
import ExchangeInfo from '@/components/ExchangeInfo/ExchangeInfo';
import { useCurrencyState } from '@/lib/stores/currencyStore';
import Loader from '@/components/Loader/Loader';

export default function Home() {
  const { exchangeInfo, isError, isLoading } = useCurrencyState();

  return (
    <main className={css.main}>
      {isLoading && <Loader />}
      <Section>
        <Container>
          <ExchangeForm />

          {!isError ? (
            <Heading info title="What currencies do you want to exchange?🙂" />
          ) : (
            <Heading
              error
              title="Something went wrong...😐 Check the data validity and try again!"
            />
          )}

          {exchangeInfo && (
            <ExchangeInfo
              amount={exchangeInfo.amount}
              to={exchangeInfo.to}
              from={exchangeInfo.from}
              rate={exchangeInfo.rate}
              result={exchangeInfo.result}
            />
          )}
        </Container>
      </Section>
    </main>
  );
}
