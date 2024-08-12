import React, { createContext, useState } from "react";
import { RESULT_PER_PAGE } from "../lib/constants";
import { useChangeSearchTextContext, useSearchQuery } from "../lib/hooks";
import { DirectionType, JobItem, SortByType } from "../lib/types";

type JobItemsContextType = {
  currentPage: number;
  totalNumberOfPages: number;
  totalNumberOfResults: number;
  jobItems: JobItem[];
  isLoading: boolean;
  sortBy: SortByType;
  jobItemsSortedAndSliced: JobItem[];
  handleChangePage: (direction: DirectionType) => void;
  handleChangeSortBy: (newSortBy: SortByType) => void;
};

export const JobItemsContext = createContext<JobItemsContextType | null>(null);

export const JobItemsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { debouncedSearchText } = useChangeSearchTextContext();
  // state
  const [currentPage, setCurrentPage] = useState(1);
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [sortBy, setSortBy] = useState<SortByType>("relevant");

  // derived state
  const totalNumberOfResults = jobItems.length;
  const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULT_PER_PAGE);

  const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return a.daysAgo - b.daysAgo;
    }
  });

  const jobItemsSortedAndSliced = jobItemsSorted?.slice(
    currentPage * RESULT_PER_PAGE - RESULT_PER_PAGE,
    currentPage * RESULT_PER_PAGE
  );

  // event handlers / actions

  const handleChangePage = (direction: DirectionType) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleChangeSortBy = (newSortBy: SortByType) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  };

  return (
    <JobItemsContext.Provider
      value={{
        currentPage,
        totalNumberOfPages,
        totalNumberOfResults,
        jobItems,
        isLoading,
        sortBy,
        jobItemsSortedAndSliced,
        handleChangePage,
        handleChangeSortBy,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
};
