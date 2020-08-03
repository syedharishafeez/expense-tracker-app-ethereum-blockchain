export const abi = [
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

export const address = "0x98f0d337bded443c8f0f795c062e2877d1ea25f8";
