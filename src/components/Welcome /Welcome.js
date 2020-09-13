import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import "./style/_component.Welcome.css";

function Welcome() {
  const [, dispatch] = useStateValue();
  const userType = [
    { type: "Sportive", value: false },
    { type: "Trainer", value: true },
  ];
  const clickHandler = (e) => {
    dispatch({
      type: "CHANGE_TRAINER",
      value: e.currentTarget.getAttribute("data-trainer"),
    });
  };
  return (
    <div className="c-Welcome">
      {userType.map((element, index) => {
        return (
          <Link
            to="/authentication"
            onClick={clickHandler}
            data-trainer={element.value}
            key={index}
            className={`c-Welcome__${element.type.toLowerCase()}`}
          >
            <div className="c-Welcome__smoke-filter">
              <p className="c-Welcome__title">I'm a {element.type}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Welcome;
