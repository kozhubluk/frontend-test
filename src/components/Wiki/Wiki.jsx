import { useApi } from '../../hooks/useApi';
import { useState } from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';
import styles from './Wiki.module.css';
import Preloader from '../Preloader/Preloader';

const Wiki = () => {
  const [{ data, status }, doFetch] = useApi();
  const [searchValue, setSearchValue] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    doFetch(
      `https://en.wikipedia.org/w/api.php?action=query&prop=info&origin=*&format=json&list=search&srsearch=${searchValue}&srlimit=10`,
    );
  };

  const handleTextChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={styles.wiki}>
      <h1>Wiki Search Engine</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Type here..."
          value={searchValue}
          onChange={handleTextChange}
        />
        <input
          className={styles['search-button']}
          type="submit"
          value="Search"
          disabled={searchValue.length === 0}
        />
        <a
          className={styles['random-button']}
          href="https://en.wikipedia.org/wiki/Special:Random"
          target="_blank"
          rel="noreferrer">
          Random
        </a>
      </form>
      {status === 'error' && 'Не удалось загрузить данные'}
      {status === 'pending' && <Preloader />}
      {status === 'succeeded' &&
        (data?.query?.search?.length ? (
          <div className={styles.articles}>
            {data.query.search.map((item) => (
              <ArticleCard
                key={item.pageid}
                title={item.title}
                snippet={item.snippet}
                link={`http://en.wikipedia.org/?curid=${item.pageid}`}
              />
            ))}
          </div>
        ) : (
          'Не найдено'
        ))}
    </div>
  );
};

export default Wiki;
