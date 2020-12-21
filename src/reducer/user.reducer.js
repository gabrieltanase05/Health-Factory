// User reducer

// Initial state for user reducer
export const initialStateUser = {
    user: null
  };
  
  const user = (state = initialStateUser, action) => {
    switch (action.type) {
      case "SET_USER":
        return {
          ...state,
          user: action.value
        };
      default:
        return state;
    }
  };
  
  export default user;
  