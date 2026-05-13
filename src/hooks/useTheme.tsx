import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => (localStorage.getItem("swiftpay:theme") as Theme) || "dark");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("swiftpay:theme", theme);
  }, [theme]);

  return { theme, setTheme: setThemeState, toggle: () => setThemeState(t => (t === "dark" ? "light" : "dark")) };
}
