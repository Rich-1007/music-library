import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import SongCard from "./components/SongList";
import Library from "./pages/Library";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <Library />
    </>
  );
}

export default App;
