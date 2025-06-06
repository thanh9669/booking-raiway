import { useState } from 'react';

const usePagination = (initialState = {
  currentPage: 1,
  itemsPerPage: 5,
  totalItems: 0,
  totalPages: 0
}) => {
  const [pagination, setPagination] = useState(initialState);

  const onPageChange = (page: number) => {
    setPagination(prev => ({
      ...prev,
      currentPage: page
    }));
  };
  const onLimitChange = (limit: number) => {
    setPagination(prev => ({
      ...prev,
      itemsPerPage: limit
    }));
  };

  const updatePagination = (data: {
    currentPage?: number;
    itemsPerPage?: number;
    totalItems?: number;
    totalPages?: number;
  }) => {
    setPagination(prev => ({
      ...prev,
      ...data,
      totalPages: data.totalPages || Math.ceil((data.totalItems || prev.totalItems) / (data.itemsPerPage || prev.itemsPerPage))
    }));
  };

  return {
    pagination,
    onPageChange,
    updatePagination,
    onLimitChange
  };
};

export default usePagination;
