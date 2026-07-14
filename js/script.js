const display = document.getElementById("result");
const history = document.getElementById("history");

let currentInput = "0";
let previousInput = "";
let operator = null;
let resetScreen = false;

updateDisplay();

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (!isNaN(value)) {
            appendNumber(value);
        } else {
            switch (value) {
                case ".":
                    appendDecimal();
                    break;

                case "+":
                case "-":
                case "*":
                case "/":
                    chooseOperator(value);
                    break;

                case "=":
                    calculate();
                    break;

                case "AC":
                    clearAll();
                    break;

                case "+/-":
                    toggleSign();
                    break;

                case "%":
                    percent();
                    break;
            }
        }
    });
});

function updateDisplay() {
    display.value = currentInput;
}

function appendNumber(number) {
    if (resetScreen) {
        currentInput = "";
        resetScreen = false;
    }

    if (currentInput === "0") {
        currentInput = number;
    } else {
        currentInput += number;
    }

    updateDisplay();
}

function appendDecimal() {
    if (resetScreen) {
        currentInput = "0";
        resetScreen = false;
    }

    if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}

function chooseOperator(op) {
    if (operator !== null) {
        calculate();
    }

    previousInput = currentInput;
    operator = op;
    history.innerText = previousInput + " " + symbol(op);
    resetScreen = true;
}

function calculate() {
    if (operator === null) return;

    let prev = parseFloat(previousInput);
    let curr = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
        case "+":
            result = prev + curr;
            break;

        case "-":
            result = prev - curr;
            break;

        case "*":
            result = prev * curr;
            break;

        case "/":
            result = curr === 0 ? "Error" : prev / curr;
            break;
    }

    history.innerText = previousInput + " " + symbol(operator) + " " + currentInput + " =";
    currentInput = result.toString();
    operator = null;
    previousInput = "";
    resetScreen = true;

    updateDisplay();
}

function clearAll() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    history.innerText = "";

    updateDisplay();
}

function toggleSign() {
    if (currentInput === "0") return;

    if (currentInput.startsWith("-")) {
        currentInput = currentInput.substring(1);
    } else {
        currentInput = "-" + currentInput;
    }

    updateDisplay();
}

function percent() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

function symbol(op) {
    switch (op) {
        case "*":
            return "×";

        case "/":
            return "÷";

        default:
            return op;
    }
}

document.addEventListener("keydown", e => {
    if (e.key >= "0" && e.key <= "9") {
        appendNumber(e.key);
    } else if (e.key === ".") {
        appendDecimal();
    } else if (["+", "-", "*", "/"].includes(e.key)) {
        chooseOperator(e.key);
    } else if (e.key === "Enter") {
        e.preventDefault();
        calculate();
    } else if (e.key === "Escape") {
        clearAll();
    } else if (e.key === "Backspace") {
        if (resetScreen) {
            currentInput = "0";
            resetScreen = false;
        } else {
            currentInput = currentInput.slice(0, -1);

            if (currentInput === "") {
                currentInput = "0";
            }
        }

        updateDisplay();
    }
});

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    themeToggle.innerHTML =
        document.body.classList.contains("dark")
        ? "☀️"
        : "🌙";

});