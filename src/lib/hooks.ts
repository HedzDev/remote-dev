import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { BookmarksContext } from "../contexts/BookmarkContextProvider";
import { BASE_API_URL } from "./constants";
import { JobItem, JobItemExpanded } from "./types";
import { handleError } from "./utils";

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

type JobItemAPIResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

async function fetchJobItem(id: number | null): Promise<JobItemAPIResponse> {
  const res = await fetch(`${BASE_API_URL}/${id}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description);
  }

  const data = await res.json();
  return data;
}

export const useJobItem = (id: number | null) => {
  const { data, isInitialLoading } = useQuery(
    ["job-items", id],
    () => (id ? fetchJobItem(id) : null),

    {
      enabled: Boolean(id), // only fetch data if id is truthy
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      onError: handleError,
    }
  );

  const isLoading = isInitialLoading;

  return { jobItem: data?.jobItem, isLoading } as const;
};

// export const useJobItems = (searchText: string) => {
//   const [jobItems, setJobItems] = useState<JobItem[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!searchText) return;

//     const fetchData = async () => {
//       setIsLoading(true);
//       const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
//       const data = await res.json();
//       setJobItems(data.jobItems);
//       setIsLoading(false);
//     };
//     fetchData();
//   }, [searchText]);

//   return { jobItems, isLoading }; // const syntax means that the return value is a tuple and it's immutable
// };
type JobItemsAPIResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

async function fetchJobItems(searchText: string): Promise<JobItemsAPIResponse> {
  const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
  const data = await res.json();

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description);
  }

  return data;
}

export const useJobItems = (searchText: string) => {
  const { data, isInitialLoading } = useQuery(
    // isInitialLoading is a boolean that indicates if the query is still in the initial loading state
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      enabled: Boolean(searchText), // only fetch data if searchText is truthy
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      onError: handleError,
    }
  );

  const isLoading = isInitialLoading;
  const jobItems = data?.jobItems || [];

  return { jobItems, isLoading } as const;
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

export const useBookmark = () => {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error(
      "BookmarkContext must be used within BookmarkContextProvider"
    );
  }

  return context;
};
