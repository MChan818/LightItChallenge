import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface FetchResult<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refetch: () => Promise<void>;
}
const useFetch = <T,>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching:", error);
      setError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, loading, refetch: fetchData };
};

export default useFetch;
