import { auth, google } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Login.css";
function Login() {
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

  return (
    <div className="login_page">
      <h3>sign in</h3>
      <div className="card ">
        <button className="btn " onClick={google_signin}>
          google
        </button>
      </div>
    </div>
  );
}

export default Login;
