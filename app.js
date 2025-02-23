function getNumber(value) {
    input.value += value;
}

const oprate = [];

function getOprate(value) {
    const lastChar = input.value[input.value.length - 1];
    if (!isNaN(lastChar)) {
        input.value += value;
        oprate.push(value);
    }
}

function calculate(expression) {
    const tokens = expression.match(/(\d+|\+|\-|\*|\/)/g); 
    if (!tokens) return;

    let result = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextNumber = parseFloat(tokens[i + 1]);

        switch (operator) {
            case '+':
                result += nextNumber;
                break;
            case '-':
                result -= nextNumber;
                break;
            case '*':
                result *= nextNumber;
                break;
            case '/':
                if (nextNumber !== 0) {
                    result /= nextNumber;
                } else {
                    input.value = "Error";
                    return;
                }
                break;
        }
    }

    input.value = result;
}

const _ = document;
const input = _.getElementById("input");
const buttons = _.querySelectorAll("#div button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();
        if (!isNaN(value)) {
            getNumber(value);
        } else if (value === "R") {
            input.value = input.value.slice(0, -1);
        } else if (value === "C") {
            input.value = ""; 
            oprate.length = 0; 
        } else if (value === "=") {
            calculate(input.value);
        } else {
            getOprate(value); 
        }
    });
});