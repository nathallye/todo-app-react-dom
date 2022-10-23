import React from "react";

function Button(props) {

  const style = props.style ? props.style : "secondary";
  const icon = props.icon ? props.icon : "heart";

  return (
    <button className={`btn btn-${style}`} onClick={props.onClick}>
      <i className={`fa fa-${icon}`}></i>
    </button>
  )
}

export default Button;