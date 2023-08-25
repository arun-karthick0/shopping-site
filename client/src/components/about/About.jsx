import "./about.css";
import { toast } from "react-toastify";
import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const About = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("form submitted");
  };
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  return (
    <section className="about">
      <h4 style={{ marginBottom: "20px" }}>About</h4>
      <div className="about_card">
        <div style={{ height: "100%", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDalamFJ0K3-6q6WRus0kHvx4NfbQ0-yoM",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent lat={59.955413} lng={30.337844} />
          </GoogleMapReact>
        </div>
        <div className="form">
          <h4 style={{ marginTop: "15px" }}>contact us</h4>
          <form>
            <div>
              <input type="text" placeholder="name" required></input>
            </div>
            <div>
              <input type="email" placeholder="email" required></input>
            </div>
            <div>
              <textarea rows={4} cols={25} required></textarea>
            </div>
            <button className="btn btn-primary" onSubmit={handleSubmit}>
              submit query
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default About;
