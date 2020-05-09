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

console.log(convertFromInfixToPosfix('2 * 3 / 5'));
// 100 100 + 1 - 2 + 3 + 4 5 * 6 / -

function evaluatePosfixExpression(expression) {

}