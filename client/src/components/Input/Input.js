import React from "react";

import classes from "./Input.css";

// a all in one input element which bundles all
// the other in build input element with the personalized
// look makes choice using props => type
const Input = props => {
  let InputElement = null;

  switch (props.type) {
    case "Input":
      // Single Input element with a nice
      // slideing up label
      InputElement = (
        <React.Fragment>
          <input
            type={props.cat}
            className={[
              classes.InputElement__input,
              props.modifier === "gray"
                ? classes["InputElement__input--gray"]
                : classes["InputElement__input--white"]
            ].join(" ")}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
          />
          <label
            className={[
              classes.InputElement__label,
              props.modifier === "gray"
                ? classes["InputElement__label--gray"]
                : classes["InputElement__label--white"]
            ].join(" ")}
          >
            {props.label}
          </label>
        </React.Fragment>
      );
      break;

    case "Select":
      // select element
      let item = props.list.map(ele => (
        <option key={ele.id} value={ele.id}>
          {ele.name}
        </option>
      ));

      InputElement = (
        <React.Fragment>
          <select
            defaultValue={props.list[0].id}
            ref={ref => props.notref(ref)}
            className={classes.InputElement__select}
          >
            {item}
          </select>
        </React.Fragment>
      );
      break;

    case "Button":
      // button element with two styles
      // gray is the default one white is the secondary
      InputElement = (
        <button
          className={[
            classes.InputElement__button,
            props.modifier === "gray"
              ? classes["InputElement__button--gray"]
              : classes["InputElement__button--white"]
          ].join(" ")}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
          onClick={props.onClick}
        >
          {props.label}
        </button>
      );
      break;

    case "Logout":
      // separate logout button it looks different then the normal button
      InputElement = (
        <button
          className={classes.InputElement__logout}
          onClick={props.onClick}
        >
          {props.label}
        </button>
      );
      break;
    default:
      break;
  }

  return <div className={classes.InputElement}>{InputElement}</div>;
};

export default Input;
