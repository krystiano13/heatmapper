import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Form } from "../components/Form";
import { UserContext } from "../contexts/UserContext";

export function Register() {
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    setErrors([]);

    fetch("http://127.0.0.1:3000/users/tokens/sign_up", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error_description) {
          setErrors([...data.error_description]);
        } else {
          localStorage.setItem("refresh_token", data.refresh_token);
          userContext?.setUser({
            id: data.resource_owner.id,
            email: data.resource_owner.email,
            token: data.token,
            refresh_token: localStorage.getItem("refresh_token") || "",
          });
          navigate("/");
        }
      });
  }

  return (
    <div className="w-full h-full flex flex-col justify-center gap-4 items-center">
      <Form submitFunc={handleSubmit} mode="register" />
      {errors.map((error) => (
        <p className="text-red-500 text-center max-w-[90%]">{error}</p>
      ))}
    </div>
  );
}
