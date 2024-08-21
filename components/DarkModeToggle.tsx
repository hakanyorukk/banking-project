"use client";

import { useEffect, useState } from "react";
import { MdLightMode, MdOutlineDarkMode } from "react-icons/md";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = localStorage.getItem("theme") === "dark";
    if (initialColorValue) {
      root.classList.add("dark");
    }
    setIsDarkMode(initialColorValue);
  }, []);

  const toggleDarkMode = () => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button onClick={toggleDarkMode} className="flex items-center">
      <div>{isDarkMode ? <MdLightMode /> : <MdOutlineDarkMode />}</div>
    </button>
  );
}
