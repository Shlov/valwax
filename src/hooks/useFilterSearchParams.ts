'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getFilterQuery, getParamsArray } from '@components/helpers';

export const useFilterSearchParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const page = searchParams.get('page');
  const sortSetting = searchParams.get('sort');
  const params: [string, string][] = getParamsArray(searchParams.entries());
  const hasFetchQuery = searchParams.get('fetch');

  const allFilterParams = params.filter(
    ([key]) => key !== 'page' && key !== 'perPage' && key !== 'fetch'
  );

  const filterParamsWithoutSort = params.filter(([key]) => key !== 'sort');

  const filterValues = allFilterParams.map(([_, value]) => value);

  const filterQuery = getFilterQuery(params);
  const filterQueryWithoutSort = getFilterQuery(filterParamsWithoutSort);

  const cleanFilter = () => {
    if (page) {
      router.replace(`${pathname}?page=${page}&perPage=9`, { scroll: false });
      return;
    }
    router.replace(pathname, { scroll: false });
  };

  const toggleFilter = (value: string, category?: string) => {
    if (!page) {
      if (filterQuery && !filterValues.includes(value) && category) {
        router.push(`?${filterQuery}&${category}=${value}`, { scroll: false });
        return;
      }

      if (!filterQuery && category && !filterValues.includes(value)) {
        router.push(`?${category}=${value}`, { scroll: false });
        return;
      }

      if (filterQuery) {
        const newQuery = params
          .filter(([_, val]) => val !== value)
          .map(([key, value]) => `${key}=${value}`)
          .flat()
          .join('&');
        router.push(`?${newQuery}`, { scroll: false });
        return;
      }
    }

    if (filterQuery && !filterValues.includes(value) && category) {
      router.push(`?${filterQuery}&${category}=${value}`, { scroll: false });
      return;
    }

    if (!filterQuery && category && !filterValues.includes(value)) {
      router.push(`?${category}=${value}`, {
        scroll: false,
      });
      return;
    }

    if (filterQuery) {
      const newQuery = params
        .filter(([_, val]) => val !== value)
        .map(([key, value]) => `${key}=${value}`)
        .flat()
        .join('&');
      router.push(`?${newQuery}`, { scroll: false });
    }
  };

  const updateSortSetting = (value: 'price' | 'price,desc') => {
    if (value === sortSetting) {
      if (filterQuery !== `sort=${value}`) {
        router.replace(`${pathname}?${filterQuery}`, { scroll: false });
      } else {
        router.replace(`${pathname}`, { scroll: false });
      }
    } else {
      const baseQuery = filterQueryWithoutSort
        ? `${filterQueryWithoutSort}&`
        : '';
      router.replace(`${pathname}?${baseQuery}sort=${value}`, {
        scroll: false,
      });
    }
  };

  return {
    page,
    allFilterParams,
    cleanFilter,
    filterValues,
    filterQuery,
    toggleFilter,
    hasFetchQuery,
    updateSortSetting,
    sortSetting,
  };
};