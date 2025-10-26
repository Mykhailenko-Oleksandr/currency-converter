'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';

import styles from './ExchangeForm.module.css';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';
import { useCurrencyState } from '@/lib/stores/currencyStore';

export default function ExchangeForm() {
  const { setExchangeInfo, setError, setLoading } = useCurrencyState();

  async function handleSubmit(formData: FormData) {
    const value = formData.get('currency') as string;
    const arreyValue = value.split(' ');

    const objValue: DataForConversion = {
      to: arreyValue[3].toUpperCase(),
      from: arreyValue[1].toUpperCase(),
      amount: Number(arreyValue[0]),
    };

    try {
      setLoading(true);
      setError(false);
      const response = await exchangeCurrency(objValue);
      setExchangeInfo(response);
    } catch (error) {
      const err = error as ErrorResponse;
      setError(true);
      setExchangeInfo(null);
      const data = err.response?.data?.error?.message ?? err.message;
      alert(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className={styles.form}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
        required
      />
    </form>
  );
}
