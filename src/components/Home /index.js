import React, {useState} from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Footer from "../Footer ";
import Header from "../Header ";

function Home(props) {

const [logoutMessage, setLogoutMessage] = useState('');
const [logoutSuccess, setLogoutSuccess] = useState(false);
  const logOut = () => {
    // If the token exist in Redux Store display the loading page
    // and send a GET request for LOGOUT
    if(props.isToken) {
      axios({
        method: 'GET',
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        url: `http://localhost:8080/api/LOGOUT?token=${props.isToken}`,
      })
      .then(function (response) {
        if(response.data.success && response.data.message){
          setLogoutMessage(response.data.message);
          setLogoutSuccess(response.data.success);
          window.localStorage.removeItem('healthFactory');
          alert(response.data.success)
        }
      })
      .catch(function (error) {
        // Handle error   ----> DEFAULT
        console.log(error);
      })
    }
  }
    // ----- display logoutMessage -----
  return <div>
    {
      logoutSuccess ?
      <Redirect to='/authentication'/>
      :
      null
    }
    {/* <Header/> */}
    <Link to='/profile'>PROFILE</Link><br/>
    <button onClick={logOut}>LOGOUT</button>
    <div>
      <h1>Hi {props.user.user.firstName} {props.user.user.lastName}</h1>
      <h2>Email: {props.user.user.email}</h2>
      <h3> {props.isTrainer ? "You are a Trainer!" : "You are a Member"}</h3>
    </div>
    {/* <Footer/> */}
  </div>
}

const mapStateToProps = (state) => {
  return {
    isToken: state.authentication.isToken,
    user: state.user,
    isTrainer: state.app.isTrainer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setToken(token) {
      dispatch(this.setToken(token));
    },
    setLoading(boolean) {
      dispatch(this.setLoading(boolean));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
