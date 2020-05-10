function convertFromInfixToPosfix(expression) {
  expression = expression.replace(/\s+/g, " ");
  // + - * / , no parenthesis
  let opStack = [];
  let result = '';
  for (let item of expression.split(" ")) {
    if (item.match(/\d+/)) {
      result += item;
    } else {
      result += ' ';
      let op;
      while (op = opStack.pop()) {
        if (item == '+' || item == '-') {
          result += ` ${op} `;
        } else {
          if (op == '+' || op == '-') {
            opStack.push(op);
            break;
          }
          result += ` ${op} `;
        }
      }
      opStack.push(item);
    }
  }

  let op;
  while (op = opStack.pop()) result += ` ${op} `;
  return result.trim();
}

function evaluatePosfixExpression(expression) {
  if (expression.length == 0) {
    return 0;
  }
  expression = expression.replace(/\s+/g, " ");
  let opStack = [];
  for (let item of expression.split(" ")) {
    if (item.match(/\d/)) {
      opStack.push(Number(item));
    } else {
      // extract two digits
      let first = opStack.pop();
      let second = opStack.pop();
      if (first === undefined || second === undefined) return 'Error';
      let res = operate(item, first, second);
      if (res != undefined) {
        opStack.push(res);
        continue;
      }
      return 'Error';
    }
  }
  return opStack.pop();
}

function operate(operation, lhs, rhs) {
  switch (operation) {
    case "+": return rhs + lhs;
    case "-": return rhs - lhs;
    case "*": return rhs * lhs;
    case "/":
      if (lhs == 0) return undefined;
      return rhs / lhs;
    default: return undefined;
  }
}


function truncateZeros(strNumber) {
  if (strNumber.length == 1) {
    return strNumber;
  }
  return strNumber.replace(/^0{1}/g, '');
}

function round(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function checkLimit(strValue) {
  if (strValue.length > DIGIT_LIMIT) {
    return String(Math.floor(Number(strValue.slice(0, DIGIT_LIMIT))));
  }
  return strValue;
}

function resetUI() {
  first = '0';
  second = '0';
  firstOperand = true;
  currentOperation = undefined;
  inputField.textContent = first;
}

Array.from(document.getElementsByClassName('digit')).forEach(digit => {
  digit.addEventListener("click", e => {
    const newContent = truncateZeros(inputField.textContent + e.target.textContent);
    if (newContent.length > DIGIT_LIMIT) {
      return;
    }
    if (firstOperand) {
      first = truncateZeros(first + e.target.textContent);
    } else {
      second = truncateZeros(second + e.target.textContent);
    }
    inputField.textContent = newContent;
  });
});

Array.from(document.getElementsByClassName('operation')).forEach(operation => {
  operation.addEventListener("click", e => {
    let op = e.target.textContent;
    if (firstOperand) {
      firstOperand = false;
      currentOperation = op;
      inputField.textContent = second;
    } else {
      const expr = `${first} ${currentOperation} ${second}`;
      const value = round(evaluatePosfixExpression(convertFromInfixToPosfix(expr)));
      first = checkLimit(`${value}`)
      second = '0';
      inputField.textContent = second;
      currentOperation = op;
    }
  });
});


document.querySelector('.equal').addEventListener('click', e => {
  if (currentOperation) {
    const expr = `${first} ${currentOperation} ${second}`;
    const res = evaluatePosfixExpression(convertFromInfixToPosfix(expr));
    if (res === 'Error') {
      resetUI();
      alert('Error happened during evaluation!');
      return;
    }
    const value = round(res);
    first = checkLimit(`${value}`)
    second = '0';
    currentOperation = undefined;
    inputField.textContent = first;
    firstOperand = true;
    return;
  }
  inputField.textContent = first;
});

document.querySelector('.dot').addEventListener('click', e => {
  if (!inputField.textContent.includes('.')) {
    inputField.textContent += '.';
    if (firstOperand) {
      if (!first.includes('.')) first += '.';
    } else {
      if (!second.includes('.')) second += '.';
    }
  }
});

document.querySelector('.clear').addEventListener("click", resetUI);

const inputField = document.querySelector("#input-field p");
const DIGIT_LIMIT = 13;
let firstOperand = true;
let first = "0";
let second = "0";
let expression = "";
let currentOperation = undefined;