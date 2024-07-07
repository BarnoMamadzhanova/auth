import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Registration from "./pages/Registration/Registration";
import Confirmation from "./pages/Confirmation/Confirmation";
import withAuthProtection from "./components/HOC/withAuthProtection";
import { Navigate } from "react-router-dom";
import "./styles/App.css";

const ProtectedProfile = withAuthProtection(Profile);
const ProtectedConfirmation = withAuthProtection(Confirmation);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<ProtectedProfile />} />
        <Route path="/confirmation" element={<ProtectedConfirmation />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
