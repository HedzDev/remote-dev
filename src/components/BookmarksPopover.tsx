import { forwardRef } from "react";
import { createPortal } from "react-dom";
import JobListPopover from "./JobListPopover";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  return createPortal(
    <div className="bookmarks-popover" ref={ref}>
      <JobListPopover />
    </div>,
    document.body
  );
});

export default BookmarksPopover;
