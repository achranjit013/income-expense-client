import React, { useState } from "react";
import { Alert, Table } from "react-bootstrap";
import { deleteTransaction } from "../helper/axiosHelper";

export const TransactionTable = ({ transList, getAllTrans }) => {
  const [checkTrans, setCheckTrans] = useState(false);
  const [idsToDelete, setIdsToDelete] = useState([]);
  const [displayDelete, setDisplayDelete] = useState(false);
  const [response, setResponce] = useState({});

  const handleOnDelete = async (ids) => {
    if (window.confirm(`Are you sure to delete ${ids.length} transactions ?`)) {
      // calling api to delete data
      const response = await deleteTransaction({ ids: ids });
      setResponce(response);

      // fetching api to display data
      response?.status === "success" && getAllTrans() && setIdsToDelete([]);

      setDisplayDelete(false);
    }
  };

  const handleOnChecked = (e) => {
    const { checked, value } = e.target;

    setResponce({});

    // takeout from idsToDelete
    const tempArr = idsToDelete.filter((item) => item !== value);

    if (checked) {
      // push in
      tempArr.push(value);
    }

    const matchingTransList = transList.filter((item) =>
      tempArr.includes(item._id)
    );

    if (matchingTransList.length === transList.length) {
      setCheckTrans(true);
    } else {
      setCheckTrans(false);
    }

    if (tempArr.length > 0) {
      setDisplayDelete(true);
    } else {
      setDisplayDelete(false);
    }

    setIdsToDelete(tempArr);
  };

  const handleOnCheckedAll = (e) => {
    const { checked, value } = e.target;

    setResponce({});

    const newIdsToDelete = idsToDelete.filter((item) =>
      transList.includes(item)
    );

    if (checked) {
      const deleteIds = transList.map((item) => item._id);
      setIdsToDelete([...newIdsToDelete, ...deleteIds]);
      setCheckTrans(true);
      setDisplayDelete(true);
    } else {
      setIdsToDelete(newIdsToDelete);
      setCheckTrans(false);
      setDisplayDelete(false);
    }
  };

  return (
    <div className="mt-5">
      <h3>Transaction records</h3>
      <p className="mt-5">{transList.length} transactions found!</p>

      {response.message && (
        <Alert variant={response.status === "success" ? "success" : "danger"}>
          {response.message}
        </Alert>
      )}

      {transList.length > 0 && (
        <input
          type="checkbox"
          className="form-check-input"
          value="trans"
          onChange={handleOnCheckedAll}
          checked={checkTrans}
        />
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Title</th>
            <th>Income</th>
            <th>Expenses</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {transList?.map(({ _id, title, date, amount, type }) => (
            <tr key={_id}>
              <td>
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={_id}
                  checked={idsToDelete.includes(_id)}
                  onChange={handleOnChecked}
                />
              </td>
              <td>{new Date(date).toLocaleDateString()}</td>
              <td>{title}</td>
              {type === "income" ? (
                <>
                  <td className="text-success">{amount}</td>
                  <td></td>
                </>
              ) : (
                <>
                  <td></td>
                  <td className="text-danger">{amount}</td>
                </>
              )}
              <td>{type}</td>
            </tr>
          ))}

          <tr className="fw-bolder">
            <td colSpan={3} className="text-end">
              Total Balance:
            </td>
            <td colSpan={3} className="text-start">
              {transList.reduce((acc, { amount, type }) => {
                return type === "income" ? acc + amount : acc - amount;
              }, 0)}
            </td>
          </tr>
        </tbody>
      </Table>
      {displayDelete && (
        <button
          onClick={() => handleOnDelete(idsToDelete)}
          className="btn btn-danger m-1"
        >
          <i className="fa-solid fa-trash"></i> You are about to delete{" "}
          {idsToDelete.length} tasks.
        </button>
      )}
    </div>
  );
};
