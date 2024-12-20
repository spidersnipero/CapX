import React from "react";
import ThemeToggle from "./ThemeToggle";
import Capxlogo from "../assets/CapxLogo.webp";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center rounded-md p-4 bg-gray-100 dark:bg-gray-800 shadow mx-4 sm:mx-6 md:mx-10">
      {/* Logo */}
      <img src={Capxlogo} alt="Logo" className="h-8" />

      {/* Theme Toggle Section */}
      <div className="flex items-center space-x-4">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
