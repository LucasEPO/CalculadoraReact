import React from "react";
import './Display.css';

//cria o display que mostra o valor recebido em props
export default props => <div className="display">{props.value}</div>