import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import { useAuth } from "./auth/AuthProvider";
import Home from "./page/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" replace />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
