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
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("orders");
      
      toast.success("logout");
    }
  };

  return (
    <div>
      <button className="detail" onClick={toggleCard}>
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
            <div style={{ marginTop: "10px", fontSize: "1rem" }}>
              {user?.displayName}
            </div>

            <div onClick={() => navigate("/shop")} className="shop">
              Shop
            </div>
            <div onClick={() => navigate("/orders")} className="shop">
              My order
            </div>
            <div onClick={() => navigate("/about")} className="shop">
              about
            </div>

            <button
              onClick={logOut}
              className="btn"
              style={{
                width: "80%",
                marginTop: "10px",
                backgroundColor: "red",
                color: "white",
                padding: "2px",
              }}
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
