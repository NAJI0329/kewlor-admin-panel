import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

import './App.css';
import "react-toastify/dist/ReactToastify.css";
import SignIn from './screens/auth/SignIn';

// Redux
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import { LOGOUT } from "./actions/types";
import { useEffectOnce } from './hook/useEffectOnce';
import { store } from './store';
import ChatBox from './screens/conversation/ChatBox';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import useAuth from './hook/useAuth';

function App() {

  const { loadUser } = useAuth()

  useEffectOnce(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    loadUser()

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) {
        store.dispatch({ type: LOGOUT });
      }
    });
  });

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute component={ChatBox} />} />
          <Route path="/auth/signin" element={<SignIn />} />
        </Routes>
      </Router>
      <ToastContainer />
    </Provider>
  );
}

export default App;
