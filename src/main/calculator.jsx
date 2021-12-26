import React, { Component } from 'react';
import './calculator.css';

import Button from '../components/Button';
import Display from '../components/Display';

//estado inicial da calculadora
const initialState = {

    //valor mostrado
    displayValue: '0',
    //se deve limpar o display
    clearDisplay: false,
    //ultima operacao selecionada
    operation: null,
    //dois valores que realizarao a operacao
    values: [0, 0],
    //indice do value que sera mexido
    current: 0
}

export default class Calculator extends Component {

    state = {...initialState};

    //arruma os this para as chamadas de funcao
    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    //funcao que volta a calculadora ao estado inicial
    clearMemory() {
        this.setState({...initialState});
    }

    //funcao que seta a operacao a ser realizada
    setOperation(operation) {
        
        //verifica em qual numero esta mexendo
        if ( this.state.current === 0 ) {

            //se for o primeiro entao perapara estado para receber o segundo numero
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {

            //se ja for o segundo numero entao ...

            const isEqual = operation === '=';
            const currentOp = this.state.operation;
            const values = [...this.state.values];

            //bloco try por causa do uso do eval
            try{

                //calcula a operacao e armazena o resultado no indice 0
                values[0] = eval(`${values[0]} ${currentOp} ${values[1]}`);

                //verifica se o valor deu erro
                if (isNaN(values[0]) || !isFinite(values[0])) {
                    this.clearMemory()
                    return
                }

            }catch(e) {
                //se foi parado no catch recupera o valor do indice 0 antes da operacao
                values[0] = this.state.values[0];
            }

            //prepara o indice 1 para receber novo valor
            //evita que haja aoperacoes desnecessarias com cliques consecutivos
            values[1] = 0;

            //prepara o estado para receber proximo valor e operacao e mostra o resultado
            this.setState({

                displayValue: values[0],
                operation: isEqual ? null : operation,
                current: isEqual ? 0 : 1,
                clearDisplay: !isEqual,
                values
            })
        }
    }

    //funcao para adicionar digito no display
    addDigit(n) {
        //verifica se ja possui outro ponto no numero e evita insercao de novos pontos
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        //prepara o valor para ser mostrado e se vai limpar o display antes ou nao
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + n;                     
        this.setState({ displayValue, clearDisplay:false });

        if ( n !== '.' ) {
            //sempre que for qualquer numero muda o tipo para float para calcular e prepara o values
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({ values })
        }
    }

    render() {

        return (

            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />    
                <Button label="/" click={this.setOperation} operation />    
                <Button label="7" click={this.addDigit} />    
                <Button label="8" click={this.addDigit} />    
                <Button label="9" click={this.addDigit} />    
                <Button label="*" click={this.setOperation} operation />    
                <Button label="4" click={this.addDigit} />    
                <Button label="5" click={this.addDigit} />    
                <Button label="6" click={this.addDigit} />    
                <Button label="-" click={this.setOperation} operation />    
                <Button label="1" click={this.addDigit} />    
                <Button label="2" click={this.addDigit} />    
                <Button label="3" click={this.addDigit} />    
                <Button label="+" click={this.setOperation} operation />    
                <Button label="0" click={this.addDigit} double />    
                <Button label="." click={this.addDigit} />    
                <Button label="=" click={this.setOperation} operation />    
            </div>
        );
    }
}