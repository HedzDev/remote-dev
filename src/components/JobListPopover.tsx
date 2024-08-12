import { useBookmarkContext } from "../lib/hooks";
import JobList from "./JobList";

export default function JobListPopover() {
  const { bookmarkedJobItems, isLoading } = useBookmarkContext();

  return <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />;
}
