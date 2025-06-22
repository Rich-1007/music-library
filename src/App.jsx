import { ToastContainer } from "react-toastify";
import Library from "./pages/Library";

function App() {
  return (
    <>
      <Library />

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
}

export default App;
