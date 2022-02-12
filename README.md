# Shunting Algorithm js

[Shunting-yard algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm)

Parsing mathematical expressions in infix to produce a postfix notation.
```
1+1   -> 11+
1*2+3 -> 12*3+
1+2*3 -> 123*+
```

```
const out = infixToPostfix('1+1+2');
console.log(out);
// {
//   tokens: [
//     { type: 'symbol', val: 1, lab: '1' },
//     { type: 'symbol', val: 1, lab: '1' },
//     { type: 'op', val: [Function: val], precedence: 1, lab: '+' },
//     { type: 'symbol', val: 2, lab: '2' },
//     { type: 'op', val: [Function: val], precedence: 1, lab: '+' }
//   ],
//   toString: '11+2+',
//   eval: 4
// }
```
**TODO**
* [ ] from infix to prefix
* [ ] from prefix to infix
* [ ] from postfix to infix
* [ ] write tests
