// Authentication reducer
export const initialStateAuth = {
  isToken: false,
};

const authentication = (state = initialStateAuth, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        isToken: action.value,
      };
    default:
      return state;
  }
};

export default authentication;
