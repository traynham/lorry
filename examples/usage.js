import Lorry from '../src/lorry.js';

// Creating a new Lorry instance without any initial values and options.
let lorry1 = new Lorry();

// Merging new key-value pairs into the lorry1 instance.
lorry1.Merge({name: 'lorry1', value: 1});
console.log(lorry1);  // Will output: Lorry { name: 'lorry1', value: 1 }

// Creating a new Lorry instance with initial values and options.
// This will also log a verbose message because the verbose option is set to true.
let lorry2 = new Lorry({name: 'lorry2', value: 2}, {name: 'Lorry2', errorLogging: true, verbose: true});

// Setting a flash message on the lorry2 instance.
// This will also log a verbose message with the flash message details.
lorry2.Flash('Warning', 'This is a warning flash message.');

// Replacing all key-value pairs in the lorry2 instance with a new set.
// This will also log a verbose message because the verbose option is set to true.
lorry2.Replace({newName: 'newLorry2', newValue: 22});
console.log(lorry2);  // Will output: Lorry { newName: 'newLorry2', newValue: 22 }

// Resetting the lorry2 instance, removing all key-value pairs.
lorry2.Reset();
console.log(lorry2);  // Will output: Lorry {}

// Throwing an error on the lorry2 instance.
// This will also log an error because the errorLogging option is set to true.
lorry2.Throw(404, 'Resource not found', 'NotFoundError');

// Directly setting the title on the lorry1 instance.
lorry1.title = 'My Great Title';
console.log(lorry1);  // Will output: Lorry { name: 'lorry1', value: 1, title: 'My Great Title' }

// Directly setting a new key-value pair on the lorry1 instance.
lorry1.newPair = 'This is a new pair';
console.log(lorry1);  // Will output: Lorry { name: 'lorry1', value: 1, title: 'My Great Title', newPair: 'This is a new pair' }

// Directly changing the value of an existing key in the lorry2 instance.
lorry2.newValue = 25;
console.log(lorry2);  // Will output: Lorry { newName: 'newLorry2', newValue: 25 }

// Directly adding an object as a value in the lorry2 instance.
lorry2.objValue = { objName: 'lorry2Obj', objValue: 2 };
console.log(lorry2);  // Will output: Lorry { newName: 'newLorry2', newValue: 25, objValue: { objName: 'lorry2Obj', objValue: 2 } }

// Directly adding an array as a value in the lorry2 instance.
lorry2.arrayValue = [1, 2, 3];
console.log(lorry2);  // Will output: Lorry { newName: 'newLorry2', newValue: 25, objValue: { objName: 'lorry2Obj', objValue: 2 }, arrayValue: [ 1, 2, 3 ] }

// Directly setting a function on the lorry1 instance.
lorry1.greet = function(name) {
  console.log(`Hello, ${name}! Welcome to Lorry.`);
};

// Using the function added to the lorry1 instance.
lorry1.greet("John"); // Outputs: Hello, John! Welcome to Lorry instance 'lorry1'.

// Alternatively, you can use ES6 arrow functions. Please note that 'this' in arrow functions
// is lexically scoped, it means 'this' inside an arrow function refers to the outer function's 'this'.
lorry1.sayGoodbye = name => {
  console.log(`Goodbye, ${name}! Leaving Lorry instance.`);
};

// Using the function added to the lorry1 instance.
lorry1.sayGoodbye("John"); // Outputs: Goodbye, John! Leaving Lorry instance 'lorry1'.
