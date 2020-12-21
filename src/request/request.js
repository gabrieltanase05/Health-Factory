import axios from 'axios';

export const getRequest = (
  localStorageToken,
  request,
  props,
  isTrainer 
) => {
    return (dispatch) => {
         axios({
            method: 'GET', 
            headers: {'Content-Type': 'application/json'},
            url: `http://localhost:8080/api/${request}${localStorageToken}`,
            
          })
          .then(function (response) {
              // Handle success
              if(response.data.userID) {
                props.getRequest(
                  isTrainer,
                  `USER?id=${response.data.userID}&isTrainer=`,
                  props
                  )
                } else {
                props.setUser(response.data.docs[0])
                props.setLoading(false);
              }
          })
          .catch(function (error) {
            // Handle error   ----> DEFAULT
            console.log(error);
          })
    }
}
