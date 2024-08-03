import toast from "react-hot-toast";

export const handleError = (err: unknown) => {
  let message;
  if (err instanceof Error) {
    message = err.message;
  } else if (typeof err === "string") {
    message = err;
  } else {
    message = "An error occurred";
  }
  toast.error(message);
};
