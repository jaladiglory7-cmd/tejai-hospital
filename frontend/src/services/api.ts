import { useCallback, useEffect, useState } from 'react';
import type { Doctor, Service, FAQ, Testimonial } from '../types';
import { defaultDoctors, defaultServices, defaultFAQs } from '../data/content';

interface ApiResult<T> {
  data: T[] | null;
  error: string | null;
  loading: boolean;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

async function fetchList<T>(endpoint: string): Promise<T[]> {
  const response = await fetch(`${API_BASE}${endpoint}`, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const json: unknown = await response.json();
  return Array.isArray(json) ? (json as T[]) : [];
}

export function useDoctors(): ApiResult<Doctor> {
  return useSimpleFetch<Doctor>('/api/doctors/', defaultDoctors);
}

export function useServices(): ApiResult<Service> {
  return useSimpleFetch<Service>('/api/services/', defaultServices);
}

export function useFAQs(): ApiResult<FAQ> {
  return useSimpleFetch<FAQ>('/api/faqs/', defaultFAQs);
}

const EMPTY_TESTIMONIALS: Testimonial[] = [];

export function useTestimonials(): ApiResult<Testimonial> {
  return useSimpleFetch<Testimonial>('/api/testimonials/', EMPTY_TESTIMONIALS);
}

function useSimpleFetch<T>(endpoint: string, fallback: T[]): ApiResult<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await fetchList<T>(endpoint);
      if (items.length > 0) {
        setData(items);
      } else {
        setData(fallback);
      }
    } catch {
      setError('fetch_failed');
      setData(fallback);
    } finally {
      setLoading(false);
    }
  }, [endpoint, fallback]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, error, loading };
}