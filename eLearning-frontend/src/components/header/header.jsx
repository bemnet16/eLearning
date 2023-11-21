import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./header.css";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import img from "../../assets/images/img_1.jpg";
import { useState } from "react";

const Header = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const user = auth.authState.user;
  const [isSetting, setIsSetting] = useState(false);
  const handleSignIn = () => {
    history.push("/login");
  };

  return (
    <div className="header">
      <h2>
        Anbessame eLearning <br /> school
      </h2>
      <nav>
        <ul>
          <NavLink to="/home" activeClassName="active_nav">
            Home
          </NavLink>
          <NavLink to="/materials" activeClassName="active_nav">
            Materials
          </NavLink>
          <NavLink to="/chat" activeClassName="active_nav">
            Chat
          </NavLink>
          <NavLink to="/schedule" activeClassName="active_nav">
            Schedule
          </NavLink>
          <NavLink to="/books" activeClassName="active_nav">
            Books
          </NavLink>
          <NavLink to="/projects" activeClassName="active_nav">
            Projects
          </NavLink>
          <NavLink to="/contact" activeClassName="active_nav">
            Contact
          </NavLink>
        </ul>
      </nav>
      {!user && <button onClick={handleSignIn}>Sign in</button>}
      {user && (
        <div onClick={() => setIsSetting(!isSetting)} className="profile">
          <div className="img">
            <img src={img} alt="" />
            {user.unseen.length > 0 && (
              <span className="notif">{user.unseen.length}</span>
            )}
          </div>
          <span className="name">
            {user.firstname} {user.lastname}
          </span>

          {isSetting && (
            <div className="setting">
              <button onClick={auth.handleLogout}>Log out</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
