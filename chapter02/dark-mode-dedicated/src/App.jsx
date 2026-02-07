import { useContext, useState, createContext, memo } from "react";

const DarkModeContext = createContext({});

function Button({ children, ...rest }) {
  const { isDarkMode } = useDarkMode(); // #1 Uses the custom hook to access the context contents
  const style = {
    backgroundColor: isDarkMode ? "#333" : "#CCC",
    border: "1px solid",
    color: "inherit",
  };
  return (
    <button style={style} {...rest}>
      {children}
    </button>
  );
}

function ToggleButton() {
  const { toggleDarkMode } = useDarkMode(); // #1 Uses the custom hook to access the context contents

  return <Button onClick={toggleDarkMode}>Toggle mode</Button>;
}

const Header = memo(function Header() {
  const style = {
    padding: "10px 5px",
    borderBottom: "1px solid",
    marginBottom: "10px",
    display: "flex",
    gap: "5px",
    justifyContent: "flex-end",
  };
  return (
    <header style={style}>
      <Button>Products</Button>
      <Button>Services</Button>
      <Button>Pricing</Button>
      <ToggleButton />
    </header>
  );
});

function Main() {  // #2 Defines the main component without memoization
  const { isDarkMode } = useDarkMode(); // #1 Uses the custom hook to access the context contents
  const style = {
    color: isDarkMode ? "white" : "black",
    backgroundColor: isDarkMode ? "black" : "white",
    margin: "-8px",
    minHeight: "100vh",
    boxSizing: "border-box",
  };
  return (
    <main style={style}>
      <Header />
      <h1>Welcome to our business site!</h1>
    </main>
  );
}

function DarkModeProvider({ children }) {  // #3 Creates a new dedicated provider component 
                                          // that wraps its children in the context provider
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((v) => !v);
  const contextValue = { isDarkMode, toggleDarkMode };
  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() { // #4 Creates a new custom hook to access the provided context values.
  return useContext(DarkModeContext);
}

export default function App() {  // #5 Returns a much more elegant JSX in the root app component,
                                //  where we just wrap the main content in the new provider component.
  return (
    <DarkModeProvider>
      <Main />
    </DarkModeProvider>
  );
}