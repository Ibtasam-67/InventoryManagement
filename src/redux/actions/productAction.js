export const addProduct = (text) => async (dispatch) => {
  try {
    dispatch({
      type: "ADD_PRODUCT",
      payload: text
    });
  } catch (err) {
    console.log(err);
  }
};
