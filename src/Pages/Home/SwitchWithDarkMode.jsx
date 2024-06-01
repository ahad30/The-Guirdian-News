import { useState } from "react";
import { Switch } from "@material-tailwind/react";

export function SwitchWithDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Here you can apply dark mode styles to your application based on the state of `darkMode`
    if (darkMode) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  };

  return (
    <div>
      <Switch
        checked={darkMode}
        onChange={toggleDarkMode}
        color="black"
        size="lg"
      />
    </div>
  );
}
