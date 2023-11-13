import "index.css";
import { Link } from "react-router-dom";
import AuthService from "../services/auth";
import { useState } from "react";
import { User } from "types";

const Login = () => {
  const [userForm, setUserForm] = useState<User>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prevUserForm) => ({
      ...prevUserForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userForm);

    const res = await AuthService.login(userForm);
    console.log(res);

    //setUserForm({ username: "", password: "" });
  };

  return (
    <div className="background-container">
      <div className="image" />
      <form
        onSubmit={handleSubmit}
        className="form-container bg-black/70 rounded-md flex flex-col p-12"
      >
        <h2 className="text-4xl text-secondary mb-8">Sign in</h2>
        <div className="my-4">
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <button type="submit" className="btn bg-accent text-darkBlue my-8">
          Sign in
        </button>
        <span className="text-gray-500 my-8">
          Don't have an account yet?{" "}
          <Link className="text-secondary" to="/signup">
            Sign up now
          </Link>
          .
        </span>
      </form>
    </div>
  );
};

export default Login;