import { AppDispatch } from "./../store";
import { toast } from "react-toastify";

export const setAlert =
  (msg: any, alertType: string, timeout = 5000) =>
  (dispatch: AppDispatch) => {
    if (alertType === "error") {
      toast.error(msg);
    } else if (alertType === "success") {
      toast.success(msg);
    } else if (alertType === "warning") {
      toast.warn(msg);
    } else if (alertType === "info") {
      toast.info(msg);
    } else {
      toast(msg);
    }
  };
