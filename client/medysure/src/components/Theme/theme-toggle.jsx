import React, { useContext } from "react";
import { ThemeContext } from "./theme-provider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="p-2 rounded border"
    >
      {theme === "dark" ? <Sun /> : <Moon   />}
    </button>
  );
}
