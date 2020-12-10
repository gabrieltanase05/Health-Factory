//Need to check the localStorage for a token to see
//if the user have been logged before and have an account !!!!!!

//And for isTrainer value
export const initialState = {
  isToken: false, //default - false
  isTrainer: false,
};

const authentication = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        isToken: action.value,
      };
    case "SET_TRAINER":
      return {
        ...state,
        isTrainer: action.value,
      };
      case "ADD_USER":
        return {
          ...state,
          ...action.value
        }
    default:
      return state;
  }
};

export default authentication;
