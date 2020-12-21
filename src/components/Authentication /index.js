import React from "react";
import { connect } from "react-redux";
import LoginSignup from "../LoginSignup ";
import "./style/_component.Authentication.css";
import { setTrainer } from '../../actions/authentication.js';

function Authentication(props) {

  const userType = [
    { type: "Sportive", value: false },
    { type: "Trainer", value: true },
  ];

  const clickHandler = (e) => {
    // Add '--split' modifier to start the animation
    let selectionElement = e.currentTarget.parentNode;
    selectionElement.classList.add("c-Authentication--split");

    // Check if the selected value is different than initial state and
    // despatch the action + set the value in hook state
    let userTypeValue = e.currentTarget.getAttribute("data-trainer");
    if(userTypeValue !== null) {
      props.setTrainer(userTypeValue)
   
      // Remove the selection element after the animation has end  -- REMOVE - FIND NEW SOLUTION
      let removeSelectionElement = setTimeout(() => {
        selectionElement.remove();
        clearTimeout(removeSelectionElement)
      }, 500)
    };
  }
  return (
    <div>
      <div className={`c-Authentication ${props.isTrainer ? "c-Authentication--split" : ""}`}>
        {
          userType.map((element, index) => {
            return (
              <button
                onClick={clickHandler}
                data-trainer={element.value}
                key={index}
                className={`c-Authentication__${element.type.toLowerCase()}`}
              >
                <div className="c-Authentication__smoke-filter">
                  <p className="c-Authentication__title">I'm a {element.type}</p>
                </div>
              </button>
            );
          })
        }
      </div> 
      {
        props.isTrainer !== null ?
        <LoginSignup/>
        :
        null
      }
    </div>
  );
}

// Redux middleware
const mapStateToProps = (state) => {
  return {
    loading: state.app.isTrainer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setTrainer(isTrainer) {
      dispatch(setTrainer(isTrainer));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)
