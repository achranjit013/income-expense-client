import React from "react";
import { SignupForm } from "../components/SignupForm";
import { Col, Container, Row } from "react-bootstrap";

export const SignUpPage = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col className="bg-light text-dark vh-100 d-flex justify-content-center align-items-center">
            <div className="shadow-lg rounded p-3">
              <h1>Join our community!</h1>
              <p>
                Sign up to our system and take controll of your transactions.
              </p>
            </div>
          </Col>
          <Col className="bg-white text-dark vh-100 d-flex justify-content-center align-items-center flex-column">
            <div className="shadow-lg rounded p-3 w-75">
              <h3>Sign Up!</h3>
              <SignupForm />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
