import { BrowserRouter, Routes, Route } from "react-router-dom";

// contexts
import { UserContextProvider } from "./contexts/UserContext";

// views
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { Register } from "./views/Register";

export function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}
