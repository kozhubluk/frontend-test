import { useApi } from '../../hooks/useApi';
import { useState } from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';

const Wiki = () => {
  const [{ data, status }, doFetch] = useApi();
  const [searchValue, setSearchValue] = useState('');

  return (
    <div>
      <form
        id="searchForm"
        onSubmit={(e) => {
          e.preventDefault();
          doFetch(
            `https://en.wikipedia.org/w/api.php?action=query&prop=info&origin=*&format=json&list=search&srsearch=${searchValue}&srlimit=10`,
          );
        }}>
        <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        <input type="submit" id="btnSearch" value="Search" />
        <a href="https://en.wikipedia.org/wiki/Special:Random">
          Random
        </a>
      </form>
      {status === 'error' && 'Не удалось загрузить данные'}
      {status === 'pending' && 'Загрузка...'}
      {status === 'succeeded' &&
        (data?.query?.search?.length
          ? data.query.search.map((item) => (
              <ArticleCard
                key={item.pageid}
                title={item.title}
                snippet={item.snippet}
                link={`http://en.wikipedia.org/?curid=${item.pageid}`}
              />
            ))
          : 'Не найдено')}
    </div>
  );
};

export default Wiki;
