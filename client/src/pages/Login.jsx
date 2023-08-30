import { Link } from "react-router-dom";
import { useState } from "react";
import { auth, google } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
function Login({ user, setUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      firstName &&
      lastName &&
      email &&
      password &&
      confirmPassword &&
      image
    ) {
      if (password === confirmPassword) {
        try {
          const storage = getStorage();
          const storageRef = ref(storage, `profile/${image.name}`);
          await uploadBytes(storageRef, image);
          const downloadUrl = await getDownloadURL(storageRef);

          createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
              const user = userCredential.user;
              const uid = user.uid; // User's UID

              const db = getFirestore();
              const userDocRef = doc(db, "users", uid);

              await setDoc(userDocRef, {
                firstName,
                lastName,
                email,
                photoURL: downloadUrl,
              });

              let newUser = {
                uid,
                displayName: firstName + "" + lastName,
                photoURL: downloadUrl,
              };

              // console.log(firstName, lastName, email, downloadUrl);
              setUser(newUser);
              console.log(user);
              navigate("/");
              toast.success("Registration successful");
            })
            .catch((err) => {
              toast.error("Failed to create user: " + err.message);
            });
        } catch (error) {
          toast.error("Failed to upload image: " + error.message);
        }
      } else {
        toast.error("Password mismatch");
      }
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <section className="py-5">
      <div className="container">
        <h3 className="text-center">signUp</h3>
        <div className="row justify-content-center">
          <div className="card col-md-8 col-lg-6">
            <form>
              <div className="mb-3">
                <label for="firstname" className="form-label">
                  First Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  required
                  placeholder="Enter your first name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="lastname" className="form-label">
                  Last Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  required
                  placeholder="Enter your last name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  required
                  id="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
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
                  required
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="confirmpassword" className="form-label">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  required
                  id="confirmpassword"
                  placeholder="Enter your confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="file" className="form-label">
                  Profile Picture:
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  required
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div>
                <button
                  style={{ width: "100%" }}
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              </div>
              <div>
                <button
                  type="button"
                  style={{ marginTop: "10px", width: "100%" }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
            {/* <div className="mt-3 text-center">or</div> */}
            {/* <button onClick={google_signin} className="btn btn-primary mt-3">
              Google
            </button> */}
            <span className="text-center" style={{ margin: "20px" }}>
              already have an account?
              <Link to={"/auth"} style={{ color: "blue" }}>
                SignIn
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login;
