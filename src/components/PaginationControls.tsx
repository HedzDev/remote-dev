import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { DirectionType } from "../lib/types";

type PaginationControlsProps = {
  onClick: (direction: DirectionType) => void;
  currentPage: number;
  totalNumberOfPages: number;
};

export default function PaginationControls({
  onClick,
  currentPage,
  totalNumberOfPages,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction="previous"
          currentPage={currentPage}
          onClick={() => onClick("previous")}
        />
      )}
      {currentPage < totalNumberOfPages && (
        <PaginationButton
          direction="next"
          currentPage={currentPage}
          onClick={() => onClick("next")}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: "next" | "previous";
  currentPage: number;
  onClick: () => void;
};

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "next" && (
        <>
          <ArrowRightIcon />
          page {currentPage + 1}
        </>
      )}

      {direction === "previous" && (
        <>
          <ArrowLeftIcon />
          page {currentPage - 1}
        </>
      )}
    </button>
  );
}
