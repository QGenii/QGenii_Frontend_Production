// hooks/useApi.js
import { useState, useCallback, useEffect } from 'react';
import apiClient from '../services/api';

/**
 * Custom hook for making API calls with loading and error states
 * @param {Function} apiFunction - API function to call
 * @param {boolean} immediate - Whether to call immediately on mount
 * @returns {Object} { data, loading, error, execute, retry }
 */
export function useApi(apiFunction, immediate = false) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(async (...args) => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await apiFunction(...args);
      setState({ data: response.data, loading: false, error: null });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, [apiFunction]);

  const retry = useCallback(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute, retry };
}

/**
 * Hook for paginated API calls
 * @param {Function} apiFunction - API function to call
 * @param {number} pageSize - Items per page
 * @returns {Object} Paginated data and controls
 */
export function usePaginatedApi(apiFunction, pageSize = 10) {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const response = await apiFunction({ page, limit: pageSize });
        const { data, pagination } = response.data;
        setAllData(data);
        setTotalPages(pagination?.totalPages || 1);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [page, pageSize, apiFunction]);

  return {
    data: allData,
    loading,
    error,
    page,
    totalPages,
    goToPage: setPage,
    nextPage: () => setPage(p => p + 1),
    prevPage: () => setPage(p => Math.max(1, p - 1))
  };
}

/**
 * Hook for debounced API calls (useful for search)
 * @param {Function} apiFunction - API function to call
 * @param {number} delay - Debounce delay in ms
 * @returns {Object} { data, loading, error, debouncedSearch }
 */
export function useDebouncedApi(apiFunction, delay = 500) {
  const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState({
    data: [],
    loading: false,
    error: null
  });

  useEffect(() => {
    if (!searchTerm.trim()) {
      setState({ data: [], loading: false, error: null });
      return;
    }

    const timer = setTimeout(async () => {
      setState(prev => ({ ...prev, loading: true }));
      try {
        const response = await apiFunction(searchTerm);
        setState({ data: response.data?.data || response.data, loading: false, error: null });
      } catch (error) {
        setState({
          data: [],
          loading: false,
          error: error.response?.data?.message || error.message
        });
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay, apiFunction]);

  return {
    ...state,
    searchTerm,
    setSearchTerm
  };
}

/**
 * Hook for optimistic updates (update UI immediately, sync with server)
 * @param {Function} updateFn - API update function
 * @returns {Object} { execute, loading, error, undo }
 */
export function useOptimisticUpdate(initialData, updateFn) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousDataRef = require('react').useRef(null);

  const execute = useCallback(async (updateData) => {
    // Store previous data for rollback
    previousDataRef.current = data;

    // Optimistic update
    setData(updateData);
    setLoading(true);

    try {
      const response = await updateFn(updateData);
      setData(response.data?.data || response.data);
      setError(null);
    } catch (err) {
      // Rollback on error
      setData(previousDataRef.current);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [data, updateFn]);

  const undo = useCallback(() => {
    if (previousDataRef.current) {
      setData(previousDataRef.current);
    }
  }, []);

  return { data, loading, error, execute, undo };
}

/**
 * Hook for polling API calls
 * @param {Function} apiFunction - API function to call
 * @param {number} interval - Poll interval in ms
 * @param {boolean} enabled - Whether polling is enabled
 * @returns {Object} { data, loading, error, stop, start }
 */
export function usePollingApi(apiFunction, interval = 5000, enabled = true) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null
  });
  const [isEnabled, setIsEnabled] = useState(enabled);
  const intervalRef = require('react').useRef(null);

  const poll = useCallback(async () => {
    try {
      const response = await apiFunction();
      setState({ data: response.data, loading: false, error: null });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error.response?.data?.message || error.message
      }));
    }
  }, [apiFunction]);

  useEffect(() => {
    if (!isEnabled) return;

    // Initial call
    poll();

    // Set up polling
    intervalRef.current = setInterval(poll, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [poll, interval, isEnabled]);

  return {
    ...state,
    stop: () => setIsEnabled(false),
    start: () => setIsEnabled(true),
    refresh: poll
  };
}

/**
 * Hook for mutation (create, update, delete)
 * @param {Function} mutationFn - Mutation function
 * @param {Function} onSuccess - Success callback
 * @param {Function} onError - Error callback
 * @returns {Object} { execute, loading, error, data, isSuccess }
 */
export function useMutation(mutationFn, { onSuccess, onError } = {}) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
    isSuccess: false
  });

  const execute = useCallback(async (...args) => {
    setState({
      data: null,
      loading: true,
      error: null,
      isSuccess: false
    });

    try {
      const response = await mutationFn(...args);
      setState({
        data: response.data,
        loading: false,
        error: null,
        isSuccess: true
      });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setState({
        data: null,
        loading: false,
        error: errorMessage,
        isSuccess: false
      });

      if (onError) {
        onError(error);
      }

      throw error;
    }
  }, [mutationFn, onSuccess, onError]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      isSuccess: false
    });
  }, []);

  return { ...state, execute, reset };
}

export default useApi;