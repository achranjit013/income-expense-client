import React, { useEffect, useState } from "react";
import { TopNav } from "../components/TopNav";
import { Button, Container } from "react-bootstrap";
import { TransactionForm } from "../components/TransactionForm";
import { getTransaction } from "../helper/axiosHelper";
import { TransactionTable } from "../components/TransactionTable";
import { CustomModal } from "../components/CustomModal";

export const Dashboard = () => {
  const [transList, setTransList] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getAllTrans();
  }, []);

  const getAllTrans = async () => {
    const { status, tranList } = await getTransaction();
    status === "success" && setTransList(tranList);
  };

  return (
    <div>
      <TopNav />
      <Container fluid>
        <div className="text-end">
          <Button
            className="mt-5"
            variant="primary"
            onClick={() => setModalShow(true)}
          >
            Add new transaction
          </Button>

          <CustomModal show={modalShow} onHide={() => setModalShow(false)}>
            <TransactionForm
              getAllTrans={getAllTrans}
              onHide={() => setModalShow(false)}
            />
          </CustomModal>
        </div>

        <TransactionTable transList={transList} getAllTrans={getAllTrans} />
      </Container>
    </div>
  );
};
