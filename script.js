const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const pointButton = document.getElementById('point-btn');
const equalButton = document.getElementById('equal-btn');
const clearButton = document.getElementById('clear-btn');
const deleteButton = document.getElementById('delete-btn');
const lastOperationScreen = document.getElementById('lastoperation');
const currentOperationScreen = document.getElementById('currentoperation');

let currentOperator = null;
let firstOperand = '', secondOperand = '';
let shouldresetScreen = false;

numberButtons.forEach((button) => {button.addEventListener('click', () => showNumber(button.textContent))});
operatorButtons.forEach((button) => {button.addEventListener('click', () => showOperator(button.textContent))});
pointButton.addEventListener('click', showPoint);
equalButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clearContent);
deleteButton.addEventListener('click', deleteContent);

function showNumber(number) {
    if (currentOperationScreen.textContent == '0' || shouldresetScreen == true)  {
        resetScreen();
    }
    currentOperationScreen.textContent += number;
    // console.log(currentOperationScreen.textContent);
}

function resetScreen() {
    // console.log("resetting screen");
    currentOperationScreen.textContent = '';
    shouldresetScreen = false;
}

function showOperator(operator) {
    if (currentOperator != null) evaluate();
    firstOperand = currentOperationScreen.textContent;
    currentOperator = operator;
    lastOperationScreen.textContent = `${firstOperand} ${currentOperator}`;
    shouldresetScreen = true;
}

function showPoint() {
    if (shouldresetScreen) resetScreen();
    if (currentOperationScreen.textContent == '')  currentOperationScreen.textContent = '0';
    if (currentOperationScreen.textContent.includes('.')) return;
    currentOperationScreen.textContent += '.';
}

function evaluate() {
    if (currentOperator == null || shouldresetScreen) return;
    if (currentOperator == '/' && currentOperationScreen.textContent == '0') {
        alert("Can't divide by zero!");
        return;
    }

    secondOperand = currentOperationScreen.textContent;
    currentOperationScreen.textContent = round(operate(currentOperator, firstOperand, secondOperand));
    lastOperationScreen.textContent = `${firstOperand} ${currentOperator} ${secondOperand} = `;
    currentOperator = null;
}

function clearContent() {
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
    firstOperand = '', secondOperand = '';
    currentOperator = null;
    shouldresetScreen = false;
}

function deleteContent() {
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1);
}

function round(number) {
    return Math.round(number * 1000) / 1000;
}

function add(a, b) {
    return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b; 
}

function div(a, b) { 
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a), b = Number(b);
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return sub(a, b);
        case '*':
            return mul(a, b);
        case '/':
            if (b == 0) return null;
            return div(a, b);
        default:
            return null;
    }
}