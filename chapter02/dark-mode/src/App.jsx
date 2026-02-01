import { useContext, useState, createContext, memo } from "react";

const DarkModeContext = createContext({}); // #1 This time, we initialize our context with an empty object. 
                                          // We always have a context at the root of the application, 
                                          // so the default values will never be used.

function Button({ children, ...rest }) {
  const { isDarkMode } = useContext(DarkModeContext); // #2 we use only the isDarkMode flag from the context.
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
  const { toggleDarkMode } = useContext(DarkModeContext); // #3 we use only the toggleDarkMode function from the context.

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

const Main = memo(function Main() { // #4 We memoize the main component.
  const { isDarkMode } = useContext(DarkModeContext); // #5 It uses only the isDarkMode flag from the context.
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
});

export default function App() {
  const [isDarkMode, setDarkMode] = useState(false);  // #6  In the main application component, 
  const toggleDarkMode = () => setDarkMode((v) => !v); // #6 we define the two values that go into our context.
  const contextValue = { isDarkMode, toggleDarkMode }; // #7 #7 We put these two values together in a single object.
  return (
    <DarkModeContext.Provider value={contextValue}> // #8 We use this single object as the value for our context provider.
      <Main />
    </DarkModeContext.Provider>
  );
}