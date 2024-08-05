import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDebounce, useJobItems } from "../lib/hooks";
import { RESULT_PER_PAGE } from "../lib/constants";
import Background from "./Background";
import BookmarksButton from "./BookmarksButton";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import JobItemContent from "./JobItemContent";
import JobList from "./JobList";
import Logo from "./Logo";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import SortingControls from "./SortingControls";

function App() {
  // state
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchText = useDebounce(searchText);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);

  // derived state
  const totalNumberOfResults = jobItems.length;
  const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULT_PER_PAGE);
  const jobItemsSliced = jobItems?.slice(
    currentPage * RESULT_PER_PAGE - RESULT_PER_PAGE,
    currentPage * RESULT_PER_PAGE
  );

  // handlers
  const handleChangePage = (direction: "next" | "previous") => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />

          <PaginationControls
            currentPage={currentPage}
            onClick={handleChangePage}
            totalNumberOfPages={totalNumberOfPages}
          />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
