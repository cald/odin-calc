// Addition function
const addition = (a, b) => a + b;

// Subtraction function
const subtraction = (a, b) => a - b;

// Multiplication function
const multiplication = (a, b) => a * b;

// Division function
const division = (a, b) => a / b;

// Operations Object
const operationsObject = {
    addition: addition,
    subtraction: subtraction,
    multiplication: multiplication,
    division: division
};

// Operate function
const operate = (operator, a, b) => operationsObject[operator].call(null, Number(a), Number(b));

// Populate display when number pushed
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.getElementById("equals");
const backspace = document.getElementById("backspace");
const allClear = document.getElementById("all-clear");
const calculatorScreenAbove = document.getElementById("calculator-screen-above");
const calculatorScreen = document.getElementById("calculator-screen");

const calculator = {
    previousNumber: null,
    currentOperator: null,
    currentOperatorSymbol: null,
    inputArray: new Array(),
    get input() {
        return this.inputArray.join("");
    },
    set input(number) {
        this.inputArray.push(number);
        this.updateDisplay();
    },
    get operation() {
        return this.currentOperator;
    },
    set operation(operator) {
        if (this.previousNumber && this.operation) {
            this.calculate();
        }
        this.currentOperator = operator.id;
        this.currentOperatorSymbol = operator.innerText;
        this.previousNumber = this.input;
        this.inputArray = new Array();
        this.updateDisplay();
    },
    backspace() {
        this.inputArray.pop();
        this.updateDisplay();
    },
    calculate() {
        this.inputArray = Array.from(String(operate(this.operation, this.previousNumber, this.input)));
        this.previousNumber = null;
        this.updateDisplay();
    },
    updateDisplay() {
        calculatorScreen.textContent = this.input;
        if (this.previousNumber) {
            calculatorScreenAbove.textContent = this.previousNumber + this.currentOperatorSymbol
        } else {
            calculatorScreenAbove.textContent = null;
        }
    },
    reset() {
        this.previousNumber = null;
        this.currentOperator = null;
        this.currentOperatorSymbol = null;
        this.inputArray = new Array();
        this.updateDisplay();
    }
};

numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        calculator.input = e.target.innerText;
        console.log(calculator)
    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        calculator.operation = e.target;
        console.log(calculator)
    });
});

backspace.addEventListener("click", (e) => {
    calculator.backspace();
    console.log(calculator)
});

equals.addEventListener("click", (e) => {
    calculator.calculate();
    console.log(calculator)
});

allClear.addEventListener("click", (e) => {
    calculator.reset();
    console.log(calculator)
});