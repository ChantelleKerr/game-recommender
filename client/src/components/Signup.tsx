import "index.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="background-container">
      <div className="image" />
      <form className="form-container bg-black/70 rounded-md flex flex-col p-12">
        <h2 className="text-4xl text-secondary mb-8">Sign up</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <button className="btn bg-accent text-darkBlue my-8">Sign up</button>
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
