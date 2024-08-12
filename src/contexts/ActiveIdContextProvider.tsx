import React, { createContext } from "react";
import { useActiveId } from "../lib/hooks";

type ActiveIdContextType = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContextType | null>(null);

export const ActiveIdContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const activeId = useActiveId();

  return (
    <ActiveIdContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
};
