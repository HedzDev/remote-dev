import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BookmarkContextProvider } from "./contexts/BookmarkContextProvider.tsx";
import { ActiveIdContextProvider } from "./contexts/ActiveIdContextProvider.tsx";
import { SearchTextContextProvider } from "./contexts/SearchTextContextProvider.tsx";
import { JobItemsContextProvider } from "./contexts/JobItemsContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SearchTextContextProvider>
        <JobItemsContextProvider>
          <BookmarkContextProvider>
            <ActiveIdContextProvider>
              <App />
            </ActiveIdContextProvider>
          </BookmarkContextProvider>
        </JobItemsContextProvider>
      </SearchTextContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
