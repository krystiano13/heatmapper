import { NavLink, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex gap-8 items-center p-6 fixed w-full navbar-shadow">
      <NavLink className="text-white text-lg font-medium" to="/">
        Home
      </NavLink>
      <NavLink className="text-white text-lg font-medium" to="/login">
        Login
      </NavLink>
      <NavLink className="text-white text-lg font-medium" to="/register">
        Register
      </NavLink>
    </nav>
  );
}
