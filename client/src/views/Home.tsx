import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";

export function Home() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userContext?.user) {
      navigate("/login");
    }
  }, [userContext?.user]);

  return <></>;
}
