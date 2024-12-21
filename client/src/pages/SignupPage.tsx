import "index.css";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import AuthService from "services/auth";
import { User } from "types";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "context/AuthContext";
import useNotification from "hooks/notifications";

const SignupPage = () => {
  const { user } = useContext<any>(AuthContext);
  const { notifySuccess, notifyError } = useNotification();
  const [userForm, setUserForm] = useState<User>({
    username: "",
    email: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await AuthService.signup(userForm);
    console.log(response.message);
    if (response.success) {
      navigate("/login");
      notifySuccess({
        message: "Success",
        description: "You successfully signed up, please log in!",
      });
    } else {
      notifyError({
        message: "Error",
        description: response.message || "An Error osccurred with signup",
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
        <h2 className="text-4xl text-secondary mb-8">Sign up</h2>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs bg-black/10 text-secondary border-secondary/70 placeholder-secondary"
          />
        </div>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs bg-black/10 text-secondary border-secondary/70 placeholder-secondary"
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="input input-bordered w-full max-w-xs bg-black/10 text-secondary border-secondary/70 placeholder-secondary"
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Confirm Password"
            className="input w-full max-w-xs bg-black/10 text-secondary border-secondary/70 placeholder-secondary"
          />
        </div>
        <Button
          htmlType="submit"
          type="primary"
          className="btn bg-primary text-secondary my-8"
        >
          Sign up
        </Button>
        <span className="text-gray-500 my-8 text-md">
          Already have an account?
          <Link to="/login" className="text-secondary pl-2">
            Sign in here
          </Link>
          .
        </span>
      </form>
    </div>
  );
};

export default SignupPage;
