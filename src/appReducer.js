let reducer = (state = { amountArray: [], textArray: [] }, action) => {
  switch (action.type) {
    case "AMOUNT_ARRAY":
      return {
        ...state,
        amountArray: [...state.amountArray, action.payload],
      };

    case "TEXT_ARRAY":
      return {
        ...state,
        textArray: [...state.textArray, action.payload],
      };
    case "CURRENT_CONTRACT":
      return {
        ...state,
        currentContract: action.payload,
      };
    case "ACCOUNTS":
      return {
        ...state,
        accounts: action.payload,
      };
    case "TOTAL_TRANSACTIONS":
      return {
        ...state,
        totalTransactions: action.payload,
      };
  }
};

export default reducer;
