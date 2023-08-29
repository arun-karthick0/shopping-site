import React from "react";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="footer-row">
          <Col md={3} sm={5} className="box">
            <div className="logo">
              <ion-icon name="bag"></ion-icon>
              <h1>shopping cart</h1>
            </div>
            <p>
              The sale of services involves the exchange of monetary value in
              return for value to customers that want to achieve specific
              outcomes. Put another way, a service is a means of delivering
              value to customers by facilitating specific outcomes that
              customers expect to achieve.
            </p>
          </Col>

          <Col md={3} sm={5} className="box">
            <h2>Contact Us</h2>
            <ul>
              <li>New York, NY 10012, United States </li>
              <li>Email: help@gmail.com</li>
              <li>Phone: +1 1123 456 780</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
