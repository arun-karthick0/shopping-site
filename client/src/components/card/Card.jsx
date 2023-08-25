import "./card.css";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Card({ user }) {
  const [isVisible, setIsVisible] = useState("");
  const navigate = useNavigate();

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
        {user && (
          <div className="profile_circle">
            <div className="name">
              {user.displayName
                ? user.displayName[0].toUpperCase()
                : user.email[0].toUpperCase()}
            </div>
          </div>
        )}
        {isVisible && (
          <div className="card_info">
            <div className="card_image">
              <img src={user?.photoURL} alt="" />
            </div>
            <div style={{ marginTop: "30px", fontSize: "1.6rem" }}>
              {user?.displayName}
            </div>

            <div onClick={() => navigate("/shop")} className="shop">
              Shop
            </div>
            <div onClick={() => navigate("/about")} className="shop">
              about
            </div>
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
