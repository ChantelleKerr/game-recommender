import "index.css";
import { Link } from "react-router-dom";
import AuthService from "../services/auth";
import { useContext, useEffect, useState } from "react";
import { User } from "types";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "context/AuthContext";

const LoginPage = () => {
  const { user, login } = useContext<any>(AuthContext);
  const [userForm, setUserForm] = useState<User>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prevUserForm) => ({
      ...prevUserForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    AuthService.login(userForm, login);
    setUserForm({ username: "", password: "" });
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
          <Input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <Button
          htmlType="submit"
          type="primary"
          className="bg-primary text-darkBlue my-8"
        >
          Sign in
        </Button>
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

export default LoginPage;
