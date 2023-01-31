const codeblocks = [
  {
    id: 0,
    name: "Fizz Buzz",
    question:
      "Write a method that returns array of all the numbers from 1 to an integer argument. But for multiples of three use “Fizz” instead of the number and for the multiples of five use “Buzz”. For numbers which are multiples of both three and five use 'FizzBuzz'",
    code: `function fizzBuzz(number) {
      
	
}`,
    solution: `function fizzBuzz (number) {
  	let arr = [];
	  for(let i=1;i<=number; i++) {
  	if(i%3 === 0 && i%5 === 0) { arr.push('FizzBuzz'); }
  	else if(i%3 === 0) { arr.push('Fizz'); }
    else if(i%5 === 0) { arr.push('Buzz'); }
  	else { arr.push(i); }
    }
	  return arr;
   }`,
  },
  {
    id: 1,
    name: "Add up the Numbers",
    question:
      "Create a function that takes a number as an argument. Add up all the numbers from 1 to the number you passed to the function. For example, if the input is 4 then your function should return 10 because 1 + 2 + 3 + 4 = 10.",
    code: ` function addUp(num) {
      //try and do it in one line of code!
          return ;
}`,
    solution: `function addUp(num) {
  return (num * (num + 1))/2;
}`,
  },
  {
    id: 2,
    name: "Smallest & Biggest Num",
    question:
      "Create a function that takes an array of numbers and return both the minimum and maximum numbers, in that order. just fill in the blanks to find the right answer!",
    code: ` function minMax(arr) {
  return [Math.min(__), Math.__(...arr)];
}`,
    solution: `function minMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}`,
  },
  {
    id: 3,
    name: "RegEx: Find the Time",
    question:
      "The time has a format: hours:minutes. Both hours and minutes have two digits, like 09:00. Make a regexp to find time in the string: Breakfast at 09:00 in the room 123:456. In this task there’s no need to check time correctness yet, so 25:99 can also be a valid result. The regexp should not match 123:456.",
    code: `const REGEXP = ?`,
    solution: `const REGEXP = /\d{2}\:\d{2}/`,
  },
];

module.exports = codeblocks;
