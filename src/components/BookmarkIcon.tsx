import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmark } from "../lib/hooks";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmark();
  return (
    <button
      onClick={(e) => {
        handleToggleBookmark(id);
        e.stopPropagation();
        e.preventDefault();
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={` ${bookmarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
