import { CandleI } from '@components/types';

import { Locale } from '../../../i18n-config';
import CandlesSection from '../CandlesSection/CandlesSection';
import Pagination from '../shared/Pagination/Pagination';
import Tabs from '../Tabs/Tabs';
import WaxDesc from '../WaxDesc/WaxDesc';

import styles from './CandlesPage.module.scss';

interface CandlesPageI {
  dictWax: {
    waxDesc: {
      title: string;
      text: string;
    };
  };
  dict: {
    tabs: {
      fullTitle: string[];
      abbreviatedTitle: string[];
    };
    filter: any;
  };
  lang: Locale;
  candles: Promise<CandleI[]>;
  page?: number;
}

const CandlesPage: React.FC<CandlesPageI> = ({
  dictWax,
  dict,
  lang,
  candles,
  page,
}) => {
  return (
    <>
      <Tabs dict={dict} lang={lang} />
      <WaxDesc dict={dictWax?.waxDesc} className={styles.waxDescAboveCandles} />
      <CandlesSection dict={dict} candles={candles} />
      <Pagination page={page} />
      <WaxDesc dict={dictWax?.waxDesc} className={styles.waxDescBelowCandles} />
    </>
  );
};

export default CandlesPage;
