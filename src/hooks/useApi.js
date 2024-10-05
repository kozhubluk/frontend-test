import { useCallback, useEffect, useState } from 'react';
import fetchJsonp from 'fetch-jsonp';

export const useApi = (endpoint = null, useJsonp = false) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(endpoint);

  const fetchData = useCallback(async () => {
    setStatus('pending');
    setData(null);

    try {
      let response;

      if (useJsonp) {
        response = await fetchJsonp(url, { jsonpCallback: 'jsonp' });
      } else {
        response = await fetch(url, {
          dataType: 'jsonp',
        });
        if (!response.ok) throw new Error(`Error status: ${response.status}`);
      }

      const responseData = await response.json();

      setStatus('succeeded');
      setError(null);
      setData(responseData);
    } catch (error) {
      setStatus('failed');
      setError(error);
      setData(null);
    }
  }, [url, useJsonp]);

  const doFetch = (url) => {
    setUrl(url);
  };

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url, fetchData]);

  return [{ data, status, error }, doFetch, fetchData];
};
