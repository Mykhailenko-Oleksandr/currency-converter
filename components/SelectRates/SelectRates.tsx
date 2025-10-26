import Select, { SingleValue } from 'react-select';

import symbols from './symbols.json';

import './ReactSelect.css';
import styles from './SelectRates.module.css';
import { useCurrencyState } from '@/lib/stores/currencyStore';

interface SelectRatesProps {
  baseCurrency: string;
}

interface OptionType {
  label: string;
  value: string;
}

export default function SelectRates({ baseCurrency }: SelectRatesProps) {
  const setBaseCurrency = useCurrencyState((state) => state.setBaseCurrency);
  const setFilter = useCurrencyState((state) => state.setFilter);

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    const newCurrency = selectedOption?.value || selectedOption?.label;
    if (!newCurrency) return;
    setFilter('');
    setBaseCurrency(newCurrency);
  };

  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        onChange={handleChange}
        className={styles.select}
        classNamePrefix="react-select"
        value={{
          label: baseCurrency,
          value: baseCurrency,
        }}
        options={symbols}
        isSearchable
      />
    </div>
  );
}
