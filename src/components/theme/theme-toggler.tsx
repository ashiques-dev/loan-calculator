"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "../svg";
import { Button } from "../ui/button";

const ThemeToggler = () => {
  const { setTheme, theme } = useTheme();
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return null;
  return (
    <Button
      variant={"accent"}
      size={"icon"}
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default ThemeToggler;
