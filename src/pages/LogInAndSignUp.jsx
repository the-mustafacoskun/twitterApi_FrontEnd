import React, { useState } from "react";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";

export default function LogInAndSignUp() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="flex flex-col ">
      <div className="flex justify-end mx-20">
        <button onClick={()=>setActiveTab(1)} className="border-b border-blue-100 p-4 rounded-2xl">Sign Up</button>
        <button onClick={()=>setActiveTab(0)} className="border-b border-blue-100 p-4 rounded-2xl">Log In</button>
      </div>
      {activeTab===0?(<LogIn />):(<SignUp />)}
    </div>
  );
}
