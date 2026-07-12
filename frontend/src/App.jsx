import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
   
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>

      {!hideNavbar && <Navbar />}

      <AppRoutes />



    </>
  );
}

export default App;
