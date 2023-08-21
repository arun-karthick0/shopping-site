import "./card.css";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useState } from "react";
function Card({ user }) {
  const [isVisible, setIsVisible] = useState("");

  const toggleCard = () => {
    setIsVisible(!isVisible);
  };

  const logOut = () => {
    if (auth) {
      signOut(auth);
      toast.success("logout");
    }
  };
  return (
    <div>
      <button className="card" onClick={toggleCard}>
        profile
        {isVisible && (
          <div className="card_info">
            <div className="card_image">
              <img src={user?.photoURL} alt="" />
            </div>
            <div style={{ marginTop: "30px" }}>{user?.displayName}</div>
            <button
              onClick={logOut}
              className="btn btn-primary"
              style={{ width: "80%", marginTop: "20px" }}
            >
              Logout
            </button>
          </div>
        )}
      </button>
    </div>
  );
}

export default Card;
