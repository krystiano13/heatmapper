import { Form } from "../components/Form";

export function Login() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Form submitFunc={handleSubmit} mode="login" />
    </div>
  );
}
