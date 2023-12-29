import React from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes.routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <AppRoutes />
      <ToastContainer position="bottom-right" />

    </div>
  );
}

export default App;
