import React, { useEffect } from "react";
import MainPage from "./views/MainPage/MainPage";
import useAppContext from "./context/useAppContext";
import { initialTeam } from "./assets/initialTeam";

function App() {
  const { loadInitialTeam } = useAppContext();
  useEffect(() => {
    loadInitialTeam(initialTeam);
  }, [loadInitialTeam]);

  return <MainPage />;
}

export default App;
