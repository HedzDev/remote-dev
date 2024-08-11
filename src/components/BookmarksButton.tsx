import { TriangleDownIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { useOnClickOutside } from "../lib/hooks";
import BookmarksPopover from "./BookmarksPopover";

export default function BookmarksButton() {
  const [showModal, setShowModal] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([buttonRef, popoverRef], () => setShowModal(false));

  return (
    <section>
      <button
        onClick={() => setShowModal((show) => !show)}
        ref={buttonRef}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>

      {showModal && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
