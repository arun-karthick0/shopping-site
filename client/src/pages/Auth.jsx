import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, google } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

function Auth({ user, setUser }) {
  // console.log(user, setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const google_signin = () => {
    signInWithPopup(auth, google)
      .then((res) => {
        // console.log(res);
        toast.success("login successful");
        navigate("/");
      })
      .catch((err) => alert(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // console.log(res.user.displayName);
        toast.success("login successful");
        navigate("/");
      })
      .catch((err) => alert(err));
  };

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center">SignIn</h2>
        <div className="row justify-content-center">
          <div className="card col-md-6">
            <form>
              <div className="mb-3">
                <label for="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label for="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <span>
                <div>
                  <button
                    style={{ width: "100%" }}
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
                <div>
                  <button
                    type="reset"
                    style={{ width: "100%", marginTop: "10px" }}
                    className="btn btn-secondary"
                  >
                    cancel
                  </button>
                </div>
              </span>
            </form>
            <div className="mt-3 text-center">or</div>
            <button onClick={google_signin} className="btn btn-primary ">
              Google
            </button>
            <span className="text-center" style={{ margin: "20px" }}>
              New user?
              <Link to={"/login"} style={{ color: "blue" }}>
                SignUp
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Auth;
