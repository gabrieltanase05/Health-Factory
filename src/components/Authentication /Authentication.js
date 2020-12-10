import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginSignup from "../LoginSignup /LoginSignup";
import "./style/_component.Authentication.css";
import { setTrainer } from '../../actions/authentication.js';

function Authentication() {

  const isTrainer = useSelector(state => state.isTrainer);
  const isToken = useSelector(state => state.isToken);
  const dispatch = useDispatch();
  const userType = [
    { type: "Sportive", value: false },
    { type: "Trainer", value: true },
  ];

  const clickHandler = (e) => {
    // Add --split modifier to start the animation
    let selectionElement = e.currentTarget.parentNode;
    selectionElement.classList.add("c-Authentication--split");

    // Check if the selected value is different than initial state
    let userTypeValue = e.currentTarget.getAttribute("data-trainer");
    if(userTypeValue !== isTrainer.toString()){
      dispatch(setTrainer(userTypeValue))
    }
    // Remove the selection element after the animation has end
    let removeSelectionElement = setTimeout(() => {
      selectionElement.remove();
      clearTimeout(removeSelectionElement)
    }, 1500)
  };
  return (
    <>
      <LoginSignup isTrainer={isTrainer} isToken={isToken}/>
      {
        !isToken ? 
        <div className={`c-Authentication ${isTrainer ? "c-Authentication--split" : ""}`}>
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
        :
        null
      }
    </>
  );
}

export default Authentication;
