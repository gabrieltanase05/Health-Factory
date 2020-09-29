import React from "react";
import { useStateValue } from "../../state_provider/StateProvider";
import LoginSignup from "../LoginSignup/LoginSignup";
import "./style/_component.Authentication.css";

function Authentication() {
  const [{isTrainer}, dispatch] = useStateValue();
  const userType = [
    { type: "Sportive", value: false },
    { type: "Trainer", value: true },
  ];
  const clickHandler = (e) => {
    e.currentTarget.parentNode.classList.add("c-Authentication--split");
    dispatch({
      type: "CHANGE_TRAINER",
      value: e.currentTarget.getAttribute("data-trainer"),
    });
  };
  return (
    <>
      <LoginSignup isTrainer={isTrainer}/>
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
    </>
  );
}

export default Authentication;
