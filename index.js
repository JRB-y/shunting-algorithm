const OPERATORS = {
    '*': {
        val: (x, y) => x * y,
        precedence: 100,
        lab: '*',
    },
    '+': {
        val: (x, y) => x + y,
        precedence: 1,
        lab: '+',
    },
    '-': {
        val: (x, y) => x - y,
        precedence: 1,
        lab: '-',
    },
    '/': {
        val: (x, y) => x / y,
        precedence: 1,
        lab: '/',
    }
};

const BRACKETS = {
  '(': { lab: '(' },
  ')': { lab: ')' },
};

// infix:string -> postfix:<token>
function infixToPostfix (src){
  const queue = []; // postfix tokens
  const op_stack = [];
  let token = '';

  while(src) {
    token = src[0];

    if (!isNaN(token)) queue.push({ type: 'symbol', val: Number(token), lab: token });

    if (token in OPERATORS) {
      const op = { type: 'op', ...OPERATORS[token] };
      // token precedenceedence
      if (op_stack.length && op_stack[op_stack.length - 1].precedence > OPERATORS[token].precedence) {
        while (op_stack.length && op_stack[op_stack.length - 1].precedence > OPERATORS[token].precedence) {
          queue.push(op_stack[op_stack.length-1]); // pop the last op in the queue
          op_stack.pop();
        }
        op_stack.push(op);
      } else {
        if (op_stack.length && op.lab === op_stack[op_stack.length - 1].lab) {
          queue.push(op);
        } else {
          op_stack.push(op);
        }
      }

    }

    if (token in BRACKETS) {
      if (token === '(') {
        op_stack.push({ type: 'bracket', val: '(' });
      } else {
        while (op_stack.length && op_stack[op_stack.length - 1].val !== '(') {
          queue.push(op_stack[op_stack.length-1]); // pop the last op in the queue
          op_stack.pop();
        }
        op_stack.pop();
      }
    }

    src = src.slice(1);
  }

  queue.push(...op_stack.reverse());

  return {
    tokens: [...queue],
    toString: queue.map(t => t.lab).join(''),
    eval: parsePostfix(queue),
  };
}

const parsePostfix = (tokens) => {
  const stack = [];
  let token = tokens.shift();

  while (token) {
    if (token.type === 'symbol') {
      stack.push(token.val);
    } else if (token.type === 'op') {
      const y = stack.pop();
      const x = stack.pop();
      stack.push(token.val(x, y));
    }
    token = tokens.shift();
  }

  return stack.pop();
}

module.exports = infixToPostfix;
