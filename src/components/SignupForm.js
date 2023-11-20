import React, { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import { postUser } from "../helper/axiosHelper";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignupForm = () => {
  const [form, setForm] = useState(initialState);
  const [response, setResponce] = useState({
    status: "",
    message: "",
  });
  const [isPending, setIsPending] = useState(false);

  const inputs = [
    {
      label: "Name",
      type: "text",
      name: "name",
      required: true,
      placeholder: "Enter your first and last name",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      required: true,
      placeholder: "Enter your email address",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      required: true,
      placeholder: "Enter your password",
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      required: true,
      placeholder: "Confirm your password",
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
    e.preventDefault();

    const { confirmPassword, ...rest } = form;

    // check if password match
    if (confirmPassword !== rest.password) {
      return alert("Password do not match!");
    }

    // call axios helper to make post api call
    setIsPending(true);
    console.log("first");
    console.log(rest);
    const data = await postUser(rest);
    console.log("third");
    console.log(data);
    setResponce(data);
    setIsPending(false);

    data.status === "success" && setForm(initialState);
  };

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        {response.message && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}

        {inputs.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

        <div className="d-grid">
          <Button variant="primary" type="submit" disabled={isPending}>
            {isPending ? <Spinner /> : "Submit"}
          </Button>
        </div>
      </Form>
      <p className="mt-5">
        Already a user?{" "}
        <a href="/">
          <Button variant="warning">Login</Button>
        </a>
      </p>
    </>
  );
};
