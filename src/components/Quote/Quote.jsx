import { useApi } from '../../hooks/useApi';
import Preloader from '../Preloader/Preloader';
import styles from './Quote.module.css';

const Quote = () => {
  const [{ data, status }, , refetch] = useApi(
    'https://api.forismatic.com/api/1.0/?method=getQuote&key=random&format=jsonp&lang=ru&jsonp=setData',
    true,
  );

  const handleClick = () => {
    refetch();
  };

  return (
    <div className={styles.quote}>
      <h1>Генератор случайных цитат</h1>
      <button className={styles.button} onClick={handleClick}>
        Случайная цитата
      </button>
      <div className={styles['quote-box']}>
        {status === 'idle' || status === 'pending' ? (
          <Preloader />
        ) : status === 'failed' ? (
          <p>Не удалось загрузить цитату</p>
        ) : (
          <>
            <p className={styles.text}>"{data.quoteText}"</p>
            {!!data.quoteAuthor && <p className={styles.author}>{data.quoteAuthor}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default Quote;
