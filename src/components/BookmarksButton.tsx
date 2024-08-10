import { TriangleDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import BookmarksPopover from "./BookmarksPopover";

export default function BookmarksButton() {
  const [showModal, setShowModal] = useState(false);
  return (
    <section>
      <button
        onClick={() => setShowModal((show) => !show)}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
        {showModal ? <BookmarksPopover /> : null}
      </button>
    </section>
  );
}
