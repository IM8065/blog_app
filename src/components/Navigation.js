import React from "react";
import "./css/Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <div className="main-nav">
            <p className="nav-link" onClick={() => onRouteChange("signout")}>
              Sign Out
            </p>
            <input className="search" type="text" placeholder="Search" />
      </div>
    );
  } else {
    return (
      <div className="main-nav">
        <div className="links">
          <div>
            <p className="nav-link" onClick={() => onRouteChange("signin")}>
              Sign In
            </p>
          </div>
          <div>
            <p className="nav-link" onClick={() => onRouteChange("register")}>
              Register
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default Navigation;
