import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import ContextValue from "./contextValues";
function Expense() {
  let callContext = useContext(ContextValue);
  let remainingAmount = 0;
  let incomeAmount = 0;
  let expenseAmount = 0;
  if (callContext[0]) {
    for (let i = 0; i < callContext[0].amountArray.length; i++) {
      remainingAmount = remainingAmount + callContext[0].amountArray[i];
      if (callContext[0].amountArray[i] > 0) {
        incomeAmount = incomeAmount + callContext[0].amountArray[i];
      } else {
        expenseAmount = expenseAmount + callContext[0].amountArray[i];
      }
    }
  }
  return (
    <div>
      <div>YOUR BALANCE</div>
      <div style={{ fontWeight: 700 }}>{remainingAmount}</div>
      <Card>
        <Card.Body style={{ background: "white" }}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              INCOME
              <div style={{ color: "green" }}>{incomeAmount}</div>
            </div>
            <div>
              <hr />
            </div>
            <div>
              EXPENSE
              <div style={{ color: "red" }}>{expenseAmount}</div>
            </div>
          </div>
        </Card.Body>
      </Card>
      <br />
    </div>
  );
}
export default Expense;
