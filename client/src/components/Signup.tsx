import "index.css";
import { Link } from "react-router-dom";
import { Input, Button } from "antd";
import AuthService from "../services/auth";
import { User } from "types";
import { useState } from "react";

const Login = () => {
  const [userForm, setUserForm] = useState<User>({
    username: "",
    email: "",
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

    const res = await AuthService.signup(userForm);
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
        <h2 className="text-4xl text-secondary mb-8">Sign up</h2>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <Button
          htmlType="submit"
          type="primary"
          className="btn bg-primary text-darkBlue my-8"
        >
          Sign up
        </Button>
        <span className="text-gray-500 my-8 text-md">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary">
            Sign in here
          </Link>
          .
        </span>
      </form>
    </div>
  );
};

export default Login;
