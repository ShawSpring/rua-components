import { useState } from "react";
import { ThemeProvider } from "./UI/ThemeProvider";
import ToggleTheme from "./UI/ToggleTheme";
import TestLButton from "./components/TestLButton";
import TestButton from "./components/TestButton";
import TestRadio from "./components/TestRaido";
function App() {
  return (
    <>
      <ThemeProvider>
        <ToggleTheme></ToggleTheme>
        <TestLButton></TestLButton>
        <TestButton></TestButton>
        <TestRadio></TestRadio>
        <TestRadio></TestRadio>
      </ThemeProvider>
    </>
  );
}

export default App;
