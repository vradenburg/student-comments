import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Main from "./Main";
import ReactGA from "react-ga4";

function App() {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
