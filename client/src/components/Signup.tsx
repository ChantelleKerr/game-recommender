import "index.css";
import { Link } from "react-router-dom";
import { Input, Button } from "antd";

const Login = () => {
  return (
    <div className="background-container">
      <div className="image" />
      <form className="form-container bg-black/70 rounded-md flex flex-col p-12">
        <h2 className="text-4xl text-secondary mb-8">Sign up</h2>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
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
        <Button type="primary" className="btn bg-primary text-darkBlue my-8">
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
