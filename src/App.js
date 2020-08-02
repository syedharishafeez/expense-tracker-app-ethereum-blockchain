import React, { useReducer, useEffect, useState } from "react";
import "./App.css";
import ContextValues from "./contextValues";
import History from "./History";
import Transactions from "./Transactions";
import Expense from "./Expense";
import AppReducer from "./appReducer";
import Web3 from "web3";

async function connectBlockchain(globalState) {
  const web3 = new Web3(Web3.givenProvider);
  let accounts = await Web3.givenProvider.enable();
  if (!globalState[0]?.accounts) {
    globalState[1]({
      type: "ACCOUNTS",
      payload: accounts,
    });
  }
  const abi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "text",
          type: "string",
        },
        {
          internalType: "int256",
          name: "value",
          type: "int256",
        },
      ],
      name: "addTransaction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "totalBalance",
      outputs: [
        {
          internalType: "int256",
          name: "",
          type: "int256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalTransactions",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "transactions",
      outputs: [
        {
          internalType: "address",
          name: "transactionOwner",
          type: "address",
        },
        {
          internalType: "string",
          name: "textValue",
          type: "string",
        },
        {
          internalType: "int256",
          name: "amountValue",
          type: "int256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const address = "0x590cb3cccbd67929f958ef7fb49275deeb8fd0a0";

  const contract = new web3.eth.Contract(abi, address);
  return contract;
}

async function loadBlockchain(globalState) {
  console.log("In loadBlockchain", globalState);
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
  console.log("before totalBalance");
  let totalTransactions = await contract.methods
    .totalTransactions()
    .call((err, result) => {
      console.log("err = ", err);
      console.log("result = ", result);
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
  console.log("before loadBlockchain");
  let globalState = useReducer(AppReducer);
  // let { initialState, setInitialState } = useState(globalState[0]);
  // await loadBlockchain();

  useEffect(() => {
    (async () => {
      await loadBlockchain(globalState);
    })();
  }, []);

  console.log("after loadBlockchain");

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
