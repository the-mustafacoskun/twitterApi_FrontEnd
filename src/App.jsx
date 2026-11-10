import { useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import { clearAuth } from "./data/api";

function App() {
  const [user,setUser] = useState(null);
  const handleLogout = () => {
    clearAuth(); 
    setUser(null); 
  };
  return (
    <div>
       <Header user={user} onLogout={handleLogout} />
      <Routes>
      <Route path="/login" element={<LogIn  onLogin={setUser}/>}/>
      <Route path="/register" element={<SignUp/>}/>
      <Route
        path="/"
        element = {user ? <HomePage user={user}/>:<Navigate to="/login" replace/>}
      />
      </Routes>
    </div>
  );
}

export default App;
