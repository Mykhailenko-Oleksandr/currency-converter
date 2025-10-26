'use client';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import Heading from '@/components/Heading/Heading';
import ExchangeForm from '@/components/ExchangeForm/ExchangeForm';
import ExchangeInfo from '@/components/ExchangeInfo/ExchangeInfo';
import Loader from '@/components/Loader/Loader';

import css from './page.module.css';
import { useCurrencyState } from '@/lib/stores/currencyStore';

export default function Home() {
  const { exchangeInfo, isError, isLoading } = useCurrencyState();

  return (
    <main className={css.main}>
      <Section>
        <Container>
          {isLoading && <Loader />}
          {!isError ? (
            <Heading info title="What currencies do you want to exchange?🙂" />
          ) : (
            <Heading
              error
              title="Something went wrong...😐 Check the data validity and try again!"
            />
          )}

          <ExchangeForm />

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
