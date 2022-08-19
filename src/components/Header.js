import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./header.css";
import logo from "../assets/logo.png";
const Header = () => {
  const [user, setUser] = useState({});

  let navigate = useNavigate();
  useEffect(() => {
    let info = localStorage.getItem("info");
    info = JSON.parse(info);

    if (!info) {
      navigate("/");
    } else {
      setUser(info);
    }
  }, []); // eslint-disable-line
  return (
    <div className="headerbg">
      <div className="logobg">
        <a href="http://localhost:3000/">
          <img className="logo" src={logo} alt={"logo"} />
        </a>
      </div>
      <div className="greeting">
        <h1>Welcome {user?.user?.firstName} </h1>
      </div>
    </div>
  );
};

export default Header;
