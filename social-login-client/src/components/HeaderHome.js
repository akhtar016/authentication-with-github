import React from "react";
import { Link } from "react-router-dom";

const HeaderHome = (props) => {
  const handleSignIn = () => {
    // Authenticate using via passport api in the backend
    // Open Github login page
    // Upon successful login, a cookie session will be stored in the client
    window.open("http://localhost:4200/auth/github", "_self");
  };

  const handleLogout = () => {
    // Logout using github passport api
    // Set authenticated state to false in the HomePage
    window.open("http://localhost:4200/auth/logout", "_self");
    props.handleNotAuthenticated();
  };

  
  const {authenticated} = props
  console.log(authenticated)

  return (
    <div>
        <nav class="navbar navbar-light bg-light justify-content-between">
        <a class="navbar-brand" href>Social Auth</a>
        <div>
        <a className="mr-4" href>
          <Link to="/">Home</Link>
        </a>
        {authenticated ? (
          <a href className="btn btn-warning" onClick={handleLogout}>Logout</a>
        ) : (
          <a href className="btn btn-info text-white" onClick={handleSignIn}>Login</a>
        )}
        </div>
        </nav>
    
    </div>
  );
};

export default HeaderHome;
