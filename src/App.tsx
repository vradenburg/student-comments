import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Main from "./Main";
import ReactGA from "react-ga4";
import { ToastContainer, toast } from "react-toastify";
import { useServiceWorker } from "./useServiceWorker";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  const { waitingWorker, showReload, reloadPage } = useServiceWorker();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
    if (showReload && waitingWorker) {
      toast(
        <div>
          A new version of this page is available <br />
          <br />
          <button onClick={() => reloadPage()}>REFRESH</button>
        </div>,
        { autoClose: false, type: "info", toastId: "new-version-notification" }
      );
    }
  }, [location, waitingWorker, showReload, reloadPage]);

  return (
    <div className="App">
      <Header />
      <Main />
      <ToastContainer />
    </div>
  );
}

export default App;
