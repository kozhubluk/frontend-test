import { useApi } from '../../hooks/useApi';

const Quote = () => {
  const [{ data, status }, , refetch] = useApi(
    'https://api.forismatic.com/api/1.0/?method=getQuote&key=random&format=jsonp&lang=ru&jsonp=setData',
    true,
  );

  return (
    <div>
      {status === 'idle' || status === 'pending'
        ? 'Load...'
        : status === 'failed'
        ? 'error'
        : data.quoteText}
      <button
        onClick={() => {
          refetch();
        }}>
        Случайная цитата
      </button>
    </div>
  );
};

export default Quote;
