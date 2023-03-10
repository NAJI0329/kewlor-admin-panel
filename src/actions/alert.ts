import { toast } from "react-toastify";

export const setAlert = (msg: string, alertType: string, timeout = 3000) => {
  if (alertType === "error") {
    toast.error(msg);
  } else if (alertType === "success") {
    toast.success(msg);
  } else if (alertType === "warning") {
    toast.warn(msg);
  } else if (alertType === "info") {
    toast.info(msg);
  } else if (alertType === "default") {
    toast(msg);
  } else {
    toast(msg);
  }
};
