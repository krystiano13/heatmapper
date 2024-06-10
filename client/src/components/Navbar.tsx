import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function Navbar() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  return (
    <nav className="flex gap-8 items-center p-6 fixed w-full navbar-shadow">
      <NavLink className="text-white text-lg font-medium" to="/">
        Home
      </NavLink>
      {!userContext?.user ? (
        <>
          <NavLink className="text-white text-lg font-medium" to="/login">
            Login
          </NavLink>
          <NavLink className="text-white text-lg font-medium" to="/register">
            Register
          </NavLink>
        </>
      ) : (
        <>
          <button
            className="text-white text-lg font-medium"
            id="logout"
            onClick={() => {
              userContext?.setUser(null);
              localStorage.removeItem("refresh_token");
              navigate("/login");
            }}
          >
            Log Out
          </button>
        </>
      )}
    </nav>
  );
}
