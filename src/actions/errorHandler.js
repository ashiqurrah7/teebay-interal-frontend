import { toast } from "react-toastify";

export const handleErrors = (err) => {
  if (err.response) {
    if (err.response.status === 403 || 401)
      toast.error("You are not authorized to perform this action");

    if (err.response.status === 500) toast.error("Server Error");
  } else {
    toast.error("Please make sure server is running");
  }
};

export const handleLoginErrors = (err) => {
  if (err.response) {
    if (err.response.status === 400 || 401)
      toast.error("Wrong user credentials");

    if (err.response.status === 500) toast.error("Server Error");

    if (err.response.status === 403) toast.error(err.response.data.message);
  } else {
    toast.error("Please make sure server is running");
  }
};
