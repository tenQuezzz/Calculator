function convertFromInfixToPosfix(expression) {
  expression = expression.replace(/\s+/g, "");
  // + - * / , no parenthesis
  let opStack = [];
  let result = '';
  for (let item of expression.split("")) {
    if (item.match(/\d/)) {
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
      if (!first || !second) return 'Error';
      let res = operate(item, first, second);
      if (res) {
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
    case "+": return lhs + rhs;
    case "-": return lhs - rhs;
    case "*": return lhs * rhs;
    case "/": return lhs / rhs;
    default: return undefined;
  }
}