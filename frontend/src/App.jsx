import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
const App = () => {
  return (
    <div className="dark:bg-black min-h-screen pt-10">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default App;
