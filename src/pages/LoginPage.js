import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col className="bg-light text-dark vh-100 d-flex justify-content-center align-items-center">
          <div className="shadow-lg rounded p-3">
            <h1>Welcome Back!</h1>
            <p>Login to our system and take controll of your transactions.</p>
          </div>
        </Col>
        <Col className="bg-white text-dark vh-100 d-flex justify-content-center align-items-center flex-column">
          <div className="shadow-lg rounded p-3 w-75">
            <h3>Login!</h3>
            <LoginForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
