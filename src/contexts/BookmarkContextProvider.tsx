import React, { createContext } from "react";
import { useLocalStorage } from "../lib/hooks";

type BookmarkContextType = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
};

export const BookmarksContext = createContext<BookmarkContextType | null>(null);

export const BookmarkContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds?.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};
