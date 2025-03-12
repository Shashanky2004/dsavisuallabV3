const CONSTANTS = {
  pi: Math.PI,
  e: Math.E,
};

const FUNCTIONS = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  log: Math.log10,
  ln: Math.log,
  sqrt: Math.sqrt,
  abs: Math.abs,
};

var animation = [];
const Bracket_Value = { "(": 1, "{": 2, "[": 3, ")": -1, "}": -2, "]": -3 };

const isdigit = (char) => {
  var ascii = char.charCodeAt(0);
  return (ascii >= 48 && ascii <= 57) || char === '.';
};

const isalpha = (char) => {
  var ascii = char.toLowerCase().charCodeAt(0);
  return ascii >= 97 && ascii <= 122;
};

const parseNumber = (str) => {
  // Handle scientific notation
  if (str.includes('e') || str.includes('E')) {
    return Number(str);
  }
  return parseFloat(str);
};

const evaluateFunction = (funcName, value) => {
  const func = FUNCTIONS[funcName.toLowerCase()];
  if (!func) {
    throw new Error(`Unknown function: ${funcName}`);
  }
  return func(parseNumber(value));
};

const Solve_small_equation = (equation) => {
  // Replace constants
  for (const [name, value] of Object.entries(CONSTANTS)) {
    const regex = new RegExp(name, 'gi');
    equation = equation.replace(regex, value.toString());
  }

  // Handle functions first
  const funcRegex = /(\w+)\(([^()]+)\)/g;
  while (funcRegex.test(equation)) {
    equation = equation.replace(funcRegex, (match, func, value) => {
      animation.push(equation);
      try {
        return evaluateFunction(func, value);
      } catch (error) {
        throw new Error(`Error evaluating ${func}(${value}): ${error.message}`);
      }
    });
  }

  const orderOfOperations = ["^", "/", "*", "+", "-"];
  for (let i = 0; i < orderOfOperations.length; i++) {
    const operator = orderOfOperations[i];
    const regex = new RegExp(`(-?\\d*\\.?\\d+(?:e[-+]?\\d+)?)\\${operator}(-?\\d*\\.?\\d+(?:e[-+]?\\d+)?)`);
    while (regex.test(equation)) {
      if (equation[0] === "+") equation = equation.substring(1);
      animation.push(equation);
      const match = equation.match(regex);
      const num1 = parseNumber(match[1]);
      const num2 = parseNumber(match[2]);
      let result;
      
      try {
        switch (operator) {
          case "^":
            result = Math.pow(num1, num2);
            break;
          case "/":
            if (num2 === 0) throw new Error("Division by zero");
            result = num1 / num2;
            break;
          case "*":
            result = num1 * num2;
            break;
          case "+":
            result = num1 + num2;
            break;
          case "-":
            result = num1 - num2;
            break;
        }
      } catch (error) {
        throw new Error(`Error evaluating ${num1} ${operator} ${num2}: ${error.message}`);
      }

      if ((operator === "+" || operator === "-") && result > 0) {
        result = "+" + result;
      }
      equation = equation.replace(regex, result);
    }
  }
  if (equation[0] === "+") equation = equation.substring(1);
  return equation;
};

export const solveEquation = (equation) => {
  try {
    animation = [];
    var stack = [];
    var newEquation = "";

    // Remove whitespace and validate characters
    equation = equation.replace(/\s+/g, '');
    const validChars = /^[0-9+\-*/^().{}\[\]eE,\w]+$/;
    if (!validChars.test(equation)) {
      throw new Error("Invalid characters in equation");
    }

    // Handle implicit multiplication
    equation = equation.replace(/(\d+)([a-zA-Z(])/g, '$1*$2');
    equation = equation.replace(/([)\]}])(\d+|[a-zA-Z(])/g, '$1*$2');

    for (var i = 0; i < equation.length; i++) {
      if (equation[i] === "(" || equation[i] === "{" || equation[i] === "[") {
        if (i > 0 && isdigit(equation[i - 1])) newEquation += "*";
        newEquation += "(";
        stack.push(equation[i]);
      } else if (equation[i] === ")" || equation[i] === "}" || equation[i] === "]") {
        if (stack.length === 0) {
          throw new Error("Mismatched closing bracket");
        }
        var last = stack.pop();
        if (Bracket_Value[last] + Bracket_Value[equation[i]] !== 0) {
          throw new Error("Mismatched bracket types");
        }
        newEquation += ")";
        if (i < equation.length - 1 && isdigit(equation[i + 1])) {
          newEquation += "*";
        }
      } else {
        newEquation += equation[i];
      }
    }

    if (stack.length > 0) {
      throw new Error("Unclosed brackets");
    }

    stack = [];
    for (var i = 0; i < newEquation.length; i++) {
      if (newEquation[i] === ")") {
        var small_equation = "";
        for (var j = stack.length - 1; j >= 0; j--) {
          var last_Value = stack.pop();
          if (last_Value === "(") break;
          small_equation = last_Value + small_equation;
        }
        if (small_equation === "") {
          throw new Error("Empty brackets");
        }
        const value_of_small_equation = Solve_small_equation(small_equation);
        if (!isFinite(value_of_small_equation)) {
          throw new Error("Result is not a finite number");
        }
        stack.push(value_of_small_equation);
      } else {
        stack.push(newEquation[i]);
      }
    }

    var small_equation = "";
    for (var j = stack.length - 1; j >= 0; j--) {
      last_Value = stack[j];
      small_equation = last_Value + small_equation;
    }
    const result = Solve_small_equation(small_equation);
    if (!isFinite(result)) {
      throw new Error("Final result is not a finite number");
    }
    animation.push(result);
    return { result, animation };
  } catch (error) {
    return { result: `Error: ${error.message}`, animation: [] };
  }
};
