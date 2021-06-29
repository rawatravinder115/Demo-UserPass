import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation =
      localStorage.getItem(
        "IsLoggedIn"
      ); /* to get the element from locale storage of the browser */

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []); /* useEffect has a anonymous func and array[] of dependency */

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem(
      "isLoggedIn",
      1
    ); /* storing key value pair in local storage in browser so track of logged in or not  */
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("IsLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    // <React.Fragment>
    //   <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
    //   <main>
    //     {!isLoggedIn && <Login onLogin={loginHandler} />}
    //     {isLoggedIn && <Home onLogout={logoutHandler} />}
    //   </main>
    // </React.Fragment>

    /***************************************************** */

    <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout : logoutHandler
      }}
    >
      {/* <MainHeader  onLogout={logoutHandler} /> */}
      <MainHeader  />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
