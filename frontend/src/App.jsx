import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";

const DB_URL = "https://13.232.140.204:8443/api/investments";

const App = () => {
  return (
    <div className="dark:bg-black min-h-screen pt-10">
      <p className="container mx-auto text-sm  lg:text-g dark:text-white">If not able to see the dashboard, please <span className="text-blue-500"><a href={DB_URL}>click here</a></span> and allow the page and come back to website </p>
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default App;
