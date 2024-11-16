import api from "@/api/api";
import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(url);
        setData(response.data);
      } catch (error) {
        console.log(error)
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);

  return { data, setData, loading };
};
