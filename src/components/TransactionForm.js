import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import { getTransaction, postTransaction } from "../helper/axiosHelper";

export const TransactionForm = () => {
  const [form, setForm] = useState({});
  const [response, setResponce] = useState({});

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    console.log(form);

    const result = await postTransaction(form);
    console.log("second");
    console.log(result);
    setResponce(result);

    if (result.status === "success") {
      getTransaction();
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const inputs = [
    {
      label: "Date",
      type: "date",
      name: "date",
      required: true,
    },
    {
      label: "Title",
      type: "text",
      name: "title",
      required: true,
    },
    {
      label: "Amount",
      type: "number",
      name: "amount",
      required: true,
    },
  ];

  return (
    <div className="mt-5">
      {response.message && (
        <Alert variant={response.status === "success" ? "success" : "danger"}>
          {response.message}
        </Alert>
      )}
      <Form
        onSubmit={handleOnSubmit}
        className="shadow-lg border rounded p-3 bg-secondary"
      >
        <Row>
          <Col md={2}>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select onChange={handleOnChange} name="type">
                <option value="">- Select -</option>
                <option value="income">Income</option>
                <option value="expenses">Expenses</option>
              </Form.Select>
            </Form.Group>
          </Col>
          {inputs.map((item, i) => (
            <Col md={3} key={i}>
              <CustomInput {...item} onChange={handleOnChange} />
            </Col>
          ))}
          <Col md={1}>
            <Form.Group className="">
              <div className="d-grid mt-4">
                <Button type="submit">Add</Button>
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
