let buffer = '0';
let runningTotal = 0;
let previousOperator;
const screen = document.querySelector('.tela');

function buttonClick(value){
    if (isNaN(parseInt(value))){
        handleSymbol(value);
        }else{
            handleNumber(value);
        }
        rerender();
    }

function handleNumber(number){
    if (buffer === '0'){
        buffer= number;
    }else {
        buffer+= number;
    }
}

function handleMath(value){
    if(buffer==='0'){
        return;
    }
    
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0){
        runningTotal= intBuffer;
    }else{
        flushoperator(intBuffer);
    }

    previousOperator = value;
    buffer= '0';
    console.log(runningTotal)
}

function flushoperator (intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer 
    }else if (previousOperator === '-'){
        runningTotal -= intBuffer
    }else if (previousOperator === '×'){
        runningTotal *= intBuffer
    }else if (previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

function handleSymbol(symbol){
    if(symbol=== 'C'); 
     
    switch(symbol){
        case 'C':
            buffer = '0';
            break;
        case '=':
            if(previousOperator === null){
                return;
            }
            flushoperator(parseInt(buffer));
            previousOperator= null;
            buffer= "" + runningTotal;
            runningTotal=0;
            break;
        case '←':
            if(buffer.length===1){
                buffer = '0';
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
        case '+':
        case '-':
        case '÷':
        case '×':
            handleMath(symbol);
            break;
    }
}

function init(){
    document.querySelector('.botoes')
        .addEventListener("click", function(event){
            buttonClick(event.target.innerText);
        })
}

function rerender(){
    screen.innerText = buffer;
}

init();