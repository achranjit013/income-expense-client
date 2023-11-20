import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const TopNav = () => {
  const userJson = sessionStorage.getItem("user");
  const userObj = JSON.parse(userJson);

  const handleOnLogOut = () => {
    sessionStorage.removeItem("user");
  };

  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#home">TR</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userObj?._id ? (
              <Link to="/" className="nav-link" onClick={handleOnLogOut}>
                Log out
              </Link>
            ) : (
              <>
                <Link to="/" className="nav-link">
                  Sign in
                </Link>
                <Link to="/signup" className="nav-link">
                  Sign up
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
