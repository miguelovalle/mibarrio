const initialState = [];

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'QTY_SUM':
      return [action.payload];

    case 'QTY_REST':
      return [action.payload];

    default:
      return state;
  }
};

