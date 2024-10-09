import ArticleCard from '../ArticleCard/ArticleCard';
import styles from './Wiki.module.css';
import Preloader from '../Preloader/Preloader';
import { observer } from 'mobx-react-lite';
import { wikiStore } from '../../store/WikiStore';

const Wiki = observer(() => {
  const { data, status, searchValue, setSearchValue, fetchArticles } = wikiStore;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchArticles();
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
});

export default Wiki;
