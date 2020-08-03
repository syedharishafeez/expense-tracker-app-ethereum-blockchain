import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import ContextValue from "./contextValues";

function Transactions() {
  let [amountValue, setAmountValue] = useState(null);
  let [textValue, setTextValue] = useState(null);
  let [addingTransaction, setAddingTransaction] = useState();

  let amountValueFunction = (e) => {
    setAmountValue(parseInt(e.target.value));
  };

  let textValueFunction = (e) => {
    setTextValue(e.target.value);
  };

  let callContext = useContext(ContextValue);
  let buttonColor = addingTransaction === "true" ? "#EE82EE" : "purple";
  return (
    <div>
      <div>Add New Transactions</div>
      <hr />
      <div>Text</div>
      <input
        type="text"
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
        type="number"
        placeholder="Enter Amount ..."
        style={{ width: "100%", padding: "5px 0px 5px 5px" }}
        onChange={amountValueFunction}
      ></input>
      <Button
        disabled={addingTransaction === "true"}
        onClick={async () => {
          if (callContext[0]?.currentContract) {
            setAddingTransaction("true");
            try {
              let addTransaction = await callContext[0].currentContract.methods
                .addTransaction(textValue, amountValue)
                .send({ from: callContext[0].accounts[0] });
              if (addTransaction.status) {
                callContext[1]({
                  type: "AMOUNT_ARRAY",
                  payload: amountValue,
                });
                callContext[1]({
                  type: "TEXT_ARRAY",
                  payload: textValue,
                });
                setAddingTransaction("false");
              }
            } catch (ex) {
              console.log("ex = ", ex);
              setAddingTransaction("error");
            }
          }
        }}
        style={{
          width: "100%",
          background: buttonColor,
          color: "white",
          marginTop: "10px",
          padding: "5px 0px 5px 5px",
        }}
      >
        Add Transactions{" "}
      </Button>
      {addingTransaction === "true" && (
        <label style={{ color: "blue" }}>Transaction is in process</label>
      )}
      {addingTransaction === "false" && (
        <label style={{ color: "green" }}>Transaction successful</label>
      )}
      {addingTransaction === "error" && (
        <label style={{ color: "red" }}>Transaction failed</label>
      )}
    </div>
  );
}

export default Transactions;
