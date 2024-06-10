import { ThemeProvider } from "./ThemeProvider";
import ToggleTheme from "./ToggleTheme";
function AttachThemeToggle() {
  console.log("attach theme toggle");
  return (
    <>
      <ThemeProvider>
        <ToggleTheme />
      </ThemeProvider>
    </>
  );
}

export default AttachThemeToggle;
