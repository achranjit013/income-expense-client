import React from "react";
import { Table } from "react-bootstrap";

export const TransactionTable = ({ transList }) => {
  return (
    <div className="mt-5">
      <p>{transList.length} transactions found!</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Income</th>
            <th>Expenses</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {transList?.map(({ _id, title, date, amount, type }) => (
            <tr>
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
            <td colSpan={2} className="text-end">
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
    </div>
  );
};
