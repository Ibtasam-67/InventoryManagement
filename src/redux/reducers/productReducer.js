const initialState = {
  data: []
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        data: [...state.data, action.payload]
      };
    default:
      return state;
  }
};

export default productReducer;
