import React from "react";
import './input.css';


const Input = (props) => {

    return (
        <input value={props.value} onChange={props.change} className="input" type={props.type} placeholder={props.placeholder} />
    )

}

export default Input;