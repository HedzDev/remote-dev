import { useEffect, useState } from "react";
import { BASE_API_URL } from "./constants";
import { JobItem, JobItemExpanded } from "./types";
import { useQuery } from "@tanstack/react-query";

export const useActiveId = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
};

// export const useJobItem = (id: number | null) => {
//   const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!id) return;

//     const fetchData = async () => {
//       setIsLoading(true);
//       const res = await fetch(`${BASE_API_URL}/${id}`);
//       const data = await res.json();
//       setJobItem(data.jobItem);
//       setIsLoading(false);
//     };

//     fetchData();
//   }, [id]);

//   return { jobItem, isLoading } as const; // const syntax means that the return value is a tuple and it's immutable
// };

export const useJobItem = (id: number | null) => {
  const { data, isLoading } = useQuery(
    ["job-items", id],
    async () => {
      if (!id) return;
      const res = await fetch(`${BASE_API_URL}/${id}`);
      const data = await res.json();
      return data;
    },
    {
      enabled: Boolean(id),
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      onError: () => {},
    }
  );

  console.log(data);

  return { jobItem: data?.jobItem, isLoading } as const;
};

export const useJobItems = (searchText: string) => {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalNumberOfResults = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
      const data = await res.json();
      setJobItems(data.jobItems);
      setIsLoading(false);
    };
    fetchData();
  }, [searchText]);

  return { jobItemsSliced, isLoading, totalNumberOfResults }; // const syntax means that the return value is a tuple and it's immutable
};

export const useDebounce = <T>(value: T, delay = 500): T => {
  // generic type T is used to make the function more flexible
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};
