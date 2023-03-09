import { store } from "../store";

import { setAlert } from "../actions/alert";
import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
} from "../actions/types";

import api from "../utils/api";
import useLoading from "./useLoading";

export default function useAuth() {
  const { setLoading } = useLoading();

  const loadUser = async () => {
    try {
      const res = await api.get("/auth/");

      store.dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      store.dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  const signin = async (req: any) => {
    try {
      const res = await api.post("/auth", req);
      if (res.data.success) {
        await store.dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.data,
        });
        setAlert(res.data.message, "success");
        loadUser();
        return true;
      }
      return false;
    } catch (error: any) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setAlert(error?.response?.data?.message, "error");
        if (error?.response?.data?.message === "Must Be Verified By Email") {
          return "VerifyEmail";
        }
      } else {
        setAlert("Server Error.", "error");
      }
      return false;
    }
  };

  const logout = async () => {
    store.dispatch({ type: LOGOUT });
  };

  return {
    signin,
    logout,
    loadUser,
  };
}
