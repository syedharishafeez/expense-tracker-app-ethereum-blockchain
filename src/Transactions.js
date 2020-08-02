import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import ContextValue from "./contextValues";
function Transactions() {
  let [amountValue, setAmountValue] = useState(null);
  let [textValue, setTextValue] = useState(null);

  console.log("amountValue = ", amountValue);
  console.log("textValue = ", textValue);

  let amountValueFunction = (e) => {
    setAmountValue(parseInt(e.target.value));
  };

  let textValueFunction = (e) => {
    setTextValue(e.target.value);
  };

  let callContext = useContext(ContextValue);

  return (
    <div>
      <div>Add New Transactions</div>
      <hr />
      <div>Text</div>
      <input
        placeholder="Enter Text ..."
        style={{ width: "100%", padding: "5px 0px 5px 5px" }}
        onChange={textValueFunction}
      ></input>

      <div>
        Amount
        <br />
        (negative expense, positive expense)
      </div>
      <input
        placeholder="Enter Amount ..."
        style={{ width: "100%", padding: "5px 0px 5px 5px" }}
        onChange={amountValueFunction}
      ></input>
      <Button
        onClick={() => {
          callContext[1]({
            type: "AMOUNT_ARRAY",
            payload: amountValue,
          });
          callContext[1]({
            type: "TEXT_ARRAY",
            payload: textValue,
          });
        }}
        style={{
          width: "100%",
          background: "purple",
          color: "white",
          marginTop: "10px",
          padding: "5px 0px 5px 5px",
        }}
      >
        Add Transactions
      </Button>
    </div>
  );
}

export default Transactions;
