import React from "react";
import './Button.css';

export default props => {

    //define as classes do botao a depender do que foi passado para alterar estilo
    let classes = 'button ';
    classes += props.operation ? 'operation ' : '';
    classes += props.double ? 'double ' : '';
    classes += props.triple ? 'triple ' : '';

    return (

        //cria o botao com label passado no props, e retorna no click esse label tambem
        <button 
            onClick={e => props.click && props.click(props.label)}
            className={ classes }>
                
            {props.label}
        </button>
    );
}