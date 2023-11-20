import React, { useEffect, useState } from "react";
import { TopNav } from "../components/TopNav";
import { Container } from "react-bootstrap";
import { TransactionForm } from "../components/TransactionForm";
import { getTransaction } from "../helper/axiosHelper";
import { TransactionTable } from "../components/TransactionTable";

export const Dashboard = () => {
  const [transList, setTransList] = useState([]);

  useEffect(() => {
    getAllTrans();
  }, []);

  const getAllTrans = async () => {
    const { status, tranList } = await getTransaction();
    console.log("i am trans list");
    console.log(transList);
    status === "success" && setTransList(tranList);
  };

  return (
    <div>
      <TopNav />
      <Container fluid>
        <TransactionForm />
        <TransactionTable transList={transList} />
      </Container>
    </div>
  );
};
