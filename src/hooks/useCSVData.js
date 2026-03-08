import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { parseCSV } from '@/utils/csvParser';
import { setData, setError } from '@/store/surveySlice';

export function useCSVData() {
  const dispatch = useDispatch();

  useEffect(() => {
    parseCSV('/data.csv')
      .then((data) => {
        dispatch(setData(data));
      })
      .catch((error) => {
        dispatch(setError(error.message || 'CSV verisi yüklenemedi'));
      });
  }, [dispatch]);
}
