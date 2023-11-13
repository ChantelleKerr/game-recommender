import "index.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="background-container">
      <div className="image" />
      <form className="form-container bg-black/70 rounded-md flex flex-col p-12">
        <h2 className="text-4xl text-secondary mb-8">Sign in</h2>
        <div className="my-4">
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <button className="btn bg-accent text-darkBlue my-8">Sign in</button>
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
