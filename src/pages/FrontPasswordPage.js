import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./frontPasswordPage.css";
import { useState } from "react";

const FrontPasswordPage = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(false);

  const authorize = async (e) => {
    e.preventDefault();
    await axios
      .post("https://www.jpdistributions.link:5000/api/user/access", { password: password })
      .then((response) => {
        setMessages([...messages, response.data]);
        setTimeout(() => {
          navigate("/auth");
        }, 2000);
      })
      .catch((error) => {
        setError(true);
        setMessages([...messages, error.response.data]);
        setTimeout(() => {
          setError(false);
          setMessages([]);
        }, 2000);
      });
  };

  return (
    <div className="bg-image">
      <div className="fake-modal">
        <h1>This is a protected site.</h1>

        <h3>Please enter the password below to proceed.</h3>
        <div className="form-content">
          <TextField
            style={{
              minWidth: "425px",
              backgroundColor: "white",
              borderRadius: "5px",
              margin: "3px",
              marginRight: "10px",
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            htmlFor="password"
            variant="standard"
          />
          <Button variant="contained" className="submit-button" onClick={authorize}>
            Submit
          </Button>
        </div>
      </div>

      {messages?.map((message) => {
        return (
          <div key={message.msg} className={error ? "error-message" : "success-message"}>
            <p>{message.msg}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FrontPasswordPage;
