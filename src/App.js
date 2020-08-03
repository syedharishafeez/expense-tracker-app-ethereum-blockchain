import React, { useReducer, useEffect, useState } from "react";
import "./App.css";
import ContextValues from "./contextValues";
import History from "./History";
import Transactions from "./Transactions";
import Expense from "./Expense";
import AppReducer from "./appReducer";
import Web3 from "web3";
import { abi, address } from "./contract-ABI-Address";

async function connectBlockchain(globalState) {
  const web3 = new Web3(Web3.givenProvider);
  let accounts = await Web3.givenProvider.enable();
  if (!globalState[0]?.accounts) {
    globalState[1]({
      type: "ACCOUNTS",
      payload: accounts,
    });
  }

  const contract = new web3.eth.Contract(abi, address);
  return contract;
}

async function loadBlockchain(globalState) {
  let contract;
  if (globalState[0]?.currentContract) {
    contract = globalState[0].currentContract;
  } else {
    contract = await connectBlockchain(globalState);
    globalState[1]({
      type: "CURRENT_CONTRACT",
      payload: contract,
    });
  }
  let totalTransactions = await contract.methods
    .totalTransactions()
    .call((err, result) => {
      if (result) {
        return result;
      }
    });

  if (totalTransactions > 0) {
    globalState[1]({
      type: "TOTAL_TRANSACTIONS",
      payload: parseInt(totalTransactions),
    });
    for (let i = 0; i < totalTransactions; i++) {
      await contract.methods.transactions(i).call((err, result) => {
        if (result) {
          globalState[1]({
            type: "AMOUNT_ARRAY",
            payload: parseInt(result.amountValue),
          });
          globalState[1]({
            type: "TEXT_ARRAY",
            payload: result.textValue,
          });
        }
      });
    }
  }
}

function App() {
  let globalState = useReducer(AppReducer);
  // let { initialState, setInitialState } = useState(globalState[0]);
  // await loadBlockchain();

  useEffect(() => {
    (async () => {
      await loadBlockchain(globalState);
    })();
  }, []);

  return (
    <ContextValues.Provider value={globalState}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="App" style={{ width: "20%" }}>
          <div>Expense Tracker</div>
          <br />
          <Expense />
          <History />
          <Transactions />
        </div>
      </div>
    </ContextValues.Provider>
  );
}

export default App;
