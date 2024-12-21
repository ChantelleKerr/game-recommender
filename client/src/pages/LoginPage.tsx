import "index.css";
import { Link } from "react-router-dom";
import AuthService from "../services/auth";
import { useContext, useEffect, useState } from "react";
import { User } from "types";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "context/AuthContext";
import useNotification from "hooks/notifications";

const LoginPage = () => {
  const { user, login } = useContext<any>(AuthContext);
  const [userForm, setUserForm] = useState<User>({
    username: "",
    password: "",
  });
  const { notifySuccess, notifyError } = useNotification();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await AuthService.login(userForm, login);
    if (response.success) {
      setUserForm({ username: "", password: "" });
      notifySuccess({
        message: "Success",
        description: "Successfully logged in",
      });
    } else {
      notifyError({
        message: "Error",
        description: response.message || "An unexcepted error occurred",
      });
    }
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
            className="input input-bordered w-full max-w-xs bg-black/10 text-secondary border-secondary/70 placeholder-secondary"
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs bg-black/10 text-secondary border-secondary/70 placeholder-secondary"
          />
        </div>
        <Button
          htmlType="submit"
          type="primary"
          className="bg-primary text-secondary my-8"
        >
          Sign in
        </Button>
        <span className="text-gray-500 my-8">
          Don't have an account yet?
          <Link className="text-secondary pl-2" to="/signup">
            Sign up now
          </Link>
          .
        </span>
      </form>
    </div>
  );
};

export default LoginPage;
