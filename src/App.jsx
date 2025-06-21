import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import SongCard from "./components/SongList";
import Library from "./pages/Library";
import NavBar from "./components/NavBar";
import LogInPage from "./pages/LogInPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      {/* <Library /> */}
      <LogInPage />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
