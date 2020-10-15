import React, { useEffect, useState } from "react";
import HeaderHome from "./HeaderHome";

const Home = () => {
  const [user, setUser] = useState({
    user: {},
    error: null,
    authenticated: false,
  });

  useEffect(() => {
    // Fetch does not send cookies. So you should add credentials: 'include'
    fetch("http://localhost:4200/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        setUser({
          authenticated: true,
          user: responseJson.user,
        });
      })
      .catch((error) => {
        setUser({
          authenticated: false,
          error: "Failed to authenticate user",
        });
      });
  }, []);

  const handleNotAuthenticated = () => {
    setUser({ authenticated: false });
  };

  return (
    <div>
      <HeaderHome
        authenticated={user.authenticated}
        handleNotAuthenticated={handleNotAuthenticated}
      />

      {!user.authenticated ? (
        <h1>Welcome!</h1>
      ) : (
        <div>
          <h1>You have logged in succcessfully!</h1>
          <h2>Welcome {user.user.name}!</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
