import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Auth from "./pages/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import Thanks from "./pages/Thanks";
import FrontPasswordPage from "./pages/FrontPasswordPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<FrontPasswordPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/form" element={<Form />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
