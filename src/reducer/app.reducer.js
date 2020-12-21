// Application reducer for general stuffs

// Initial state for application reducer
export const initialStateApp = {
    isTrainer: null,
    loading: true,
  };
  
  const app = (state = initialStateApp, action) => {
    switch (action.type) {
      case "SET_TRAINER":
        return {
          ...state,
          isTrainer: action.value,
        };
      case "SET_LOADING":
        return {
          ...state,
          loading: action.value
        }
      default:
        return state;
    }
  };
  
  export default app;
  