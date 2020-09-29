//Need to check the localStorage for a token to see
//if the user have been logged before and have an account !!!!!!

//And for isTrainer value
export const initialState = {
  isToken: false,
  isTrainer: false,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "CHANGE_TOKEN":
      return {
        ...state,
        isToken: action.value,
      };
    case "CHANGE_TRAINER":
      return {
        ...state,
        isTrainer: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
