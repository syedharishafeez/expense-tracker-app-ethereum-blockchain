let reducer = (state = { amountArray: [], textArray: [] }, action) => {
  switch (action.type) {
    case "AMOUNT_ARRAY":
      console.log("action = ", action);
      return {
        ...state,
        amountArray: [...state.amountArray, action.payload],
      };

    case "TEXT_ARRAY":
      return {
        ...state,
        textArray: [...state.textArray, action.payload],
      };
  }
};

export default reducer;
