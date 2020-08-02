import React, { useReducer, useEffect } from "react";
import "./App.css";
// import ContextValues from "./contextValues";
// import History from "./History";
// import Transactions from "./Transactions";
// import Expense from "./Expense";
// import AppReducer from "./appReducer";
import Web3 from "web3";

async function loadBlockchain() {
  console.log("In loadBlockchain");
  const web3 = new Web3(Web3.givenProvider);
  await Web3.givenProvider.enable();

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
  const address = "0x0dc2d6e5be9529b995871be8cebacf494f3ada81";

  const contract = new web3.eth.Contract(abi, address);
  console.log("before totalBalance");
  await contract.methods.transactions(0).call((err, result) => {
    console.log("err = ", err);
    console.log("result = ", result);
  });
}

function App() {
  console.log("before loadBlockchain");
  // await loadBlockchain();

  useEffect(() => {
    (async () => {
      await loadBlockchain();
    })();
  }, []);

  console.log("after loadBlockchain");
  // let globalState = useReducer(AppReducer);
  return <h1>Hello World</h1>;
  // return (
  //   <ContextValues.Provider value={globalState}>
  //     <div style={{ display: "flex", justifyContent: "center" }}>
  //       <div className="App" style={{ width: "20%" }}>
  //         <div>Expense Tracker</div>
  //         <br />
  //         <Expense />
  //         <History />
  //         <Transactions />
  //       </div>
  //     </div>
  //   </ContextValues.Provider>
  // );
}

export default App;
