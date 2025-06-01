// src/hooks/news/useNews.ts
import { useState, useEffect } from 'react';
import ModulesApi from '@/api/moduleApi';
import usePagination from '@/hooks/usePagination';
import { ENUMS } from '@/enums/index';
import toast from '@/helpers/toast';

const useNews = () => {
  const { newsApi } = ModulesApi();
  const { pagination, onPageChange, updatePagination } = usePagination();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      console.log("fetchData", pagination.currentPage)
      setLoading(true);
      const resp = await newsApi.get({
        offset: pagination.currentPage,
        limit: pagination.itemsPerPage
      });
      
      setNews(resp?.data?.data?.data ?? []);
      updatePagination({
        currentPage: resp?.data?.data?.offset,
        itemsPerPage: resp?.data?.data?.limit,
        totalItems: resp?.data?.data?.total
      });
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id: number) => {
    try {
      const resp = await newsApi.delete(id.toString()) as any;
      if (resp?.status == ENUMS.SUCCESS) {
        toast.success(resp?.data?.message);
        fetchData(); // Refresh data after deletion
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete item');
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.currentPage]);

  return {
    news,
    loading,
    error,
    pagination,
    onPageChange,
    removeItem,
    refreshData: fetchData
  };
};

export default useNews;