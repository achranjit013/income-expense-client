import React, { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../helper/axiosHelper";

export const LoginForm = () => {
  const [form, setForm] = useState({});
  const [response, setResponce] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const inputs = [
    {
      label: "Email",
      type: "email",
      name: "email",
      required: true,
      placeholder: "Enter your email address",
    },
    {
      label: "password",
      type: "password",
      name: "password",
      required: true,
      placeholder: "Enter your password",
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    console.log("first");
    e.preventDefault();

    setResponce({});
    setIsLoading(true);

    const result = await loginUser(form);
    console.log(result);

    setIsLoading(false);
    if (result?.status === "success") {
      sessionStorage.setItem("user", JSON.stringify(result.user));

      // redirect user to dashboard after logged in
      navigate("/dashboard");
    } else {
      setResponce(result);
    }
  };

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        {response.message && <Alert variant="danger">{response.message}</Alert>}

        {inputs.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

        <div className="d-grid">
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" /> : "Login"}
          </Button>
        </div>
      </Form>
      <p className="mt-5">
        Are you new here?
        <a href="/signup">
          <Button variant="warning">Sign Up</Button>
        </a>
      </p>
    </>
  );
};
