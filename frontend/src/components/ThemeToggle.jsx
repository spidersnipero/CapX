import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border dark:border-gray-600 dark:bg-gray-900 dark:text-white transition-all duration-300 ease-in-out"
      style={{
        backgroundColor: theme === "dark" ? "#4B5563" : "#E5E7EB", // Gray color based on theme
        color: theme === "dark" ? "#fff" : "#1F2937", // Dark text for dark theme
        transform: theme === "dark" ? "scale(1.1)" : "scale(1)", // Slight scaling effect
      }}
    >
      {/* Icon for better UI (Optional) */}
      {theme === "dark" ? (
        <span
          className={`transition-transform duration-300 px-1 ${
            theme === "dark" ? "rotate-180" : ""
          }`}
        >
          &#9728;
        </span>
      ) : (
        <span
          className={`transition-transform duration-300 px-1 ${
            theme === "dark" ? "rotate-180" : ""
          }`}
        >
          {/* sun icon */}
          &#9790;
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
