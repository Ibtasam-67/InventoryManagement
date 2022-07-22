const initialState = {
  data: []
};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST":
      return {};

    case "ADD_STORE":
      return {
        ...state,
        data: [...state.data, action.payload]
      };
    default:
      return state;
  }
};

export default storeReducer;
