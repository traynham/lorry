# Lorry
The Lorry class, built with JavaScript ES6, serves as a robust tool for manipulating key-value pair data. It offers a suite of functions for controlling and shaping your data, including operations for merging new key-value pairs into an existing dataset, replacing all current pairs with a new set, and completely resetting the dataset by removing all existing pairs. Furthermore, the class provides robust error handling capabilities to ensure your operations run smoothly.

The Lorry class is especially useful when creating and modifying payloads intended to be passed between different functions, such as those seen in an Express render call. The class assists in managing the data through various stages of processing, while keeping it easily accessible and manipulatable.

Designed with end-user applications in mind, the Lorry class is not just a developer's tool but also a means to improve the user experience. It helps handle and shape the data that will ultimately be presented to the user, ensuring the data remains consistent, controlled, and ready for presentation at all times.

Sure, here's a paragraph explaining how to install the Lorry class using npm:

## Installation

Installing the Lorry class is straightforward and easy using npm, the Node Package Manager. The module is hosted on GitHub and can be added directly to your project via the GitHub repository. Simply open your terminal, navigate to your project directory, and run the following command:

```bash
npm i github:traynham/lorry
```

This command tells npm to install the Lorry class module from the "traynham/lorry" repository on GitHub. After running this command, the Lorry class will be downloaded and added to your `node_modules` folder, and you will be able to import it into your project files and start using it immediately.


## Usage

### Import
To use this class in your project, simply import it at the top of your JavaScript file:

```javascript
import Lorry from 'lorry';
```

### Creating an Instance

```javascript
// SYNTAX
let payload = new Lorry(obj, opt)
```

Creating a new instance of the Lorry class is straightforward. Call the `Lorry` constructor with or without an initial object or options:

```javascript
let payload = new Lorry()
```

The Lorry constructor takes up to two arguments:

1. `obj` (optional): The initial key-value pairs to be held by the Lorry instance. This should be an object where each key-value pair represents a data entry. For instance, you could create a Lorry instance with some initial data like so:

	```javascript
	let payload = new Lorry({ key1: 'value1', key2: 'value2' })
	```

2. `opt` (optional): A set of options to configure the behavior of the Lorry instance. This should also be an object. The available options are:

	- `name`: A name for the Lorry instance. This is used in logging and error messages.
	- `errorLogging`: A boolean indicating whether errors should be logged to the console. Defaults to `false`.
	- `verbose`: A boolean indicating whether the Lorry should log additional details about its operation to the console. Defaults to `false`.

	You can set these options when creating the Lorry instance:

	```javascript
	let payload = new Lorry(
		{ key1: 'value1', key2: 'value2' },
		{ name: 'MyLorry', errorLogging: true, verbose: true }
	)
	```

These optional arguments provide you with flexibility when creating a Lorry instance, allowing you to customize the initial data and behavior to suit your needs.

### Merging keys

```javascript
// SYNTAX
payload.Merge(obj)
```

To merge new keys into the Lorry instance, use the `Merge` method:

```javascript
payload.Merge({ key3: 'value3' })
```

### Replacing keys

```javascript
// SYNTAX
payload.Replace(obj)
```

To replace all keys in the Lorry instance, use the `Replace` method. This method will call Reset() and then merge the obj passed to it.

```javascript
payload.Replace({ key4: 'value4' });
```

### Accessing and Modifying keys directly
You can set new keys directly:

```javascript
payload.title = 'My Great Title'
payload.animals = ['goat', 'chicken', 'pig', 'chimpanzee']
payload.title = 'One of these does not belong with the other...'
console.log(payload.title);  // Logs: One of these does not belong with the other...
```

### Resetting keys

```javascript
// SYNTAX
payload.Reset()
```

To clear all keys from the Lorry instance, use the `Reset` method:

```javascript
payload.Reset();
```

### Error Handling

```javascript
// SYNTAX
payload.Throw(code, message, name, level)
```

The Lorry class provides a flexible approach to error handling via the `Throw()` method. This method allows you to set an error message on the Lorry instance with various levels of customization.

1. **No Arguments:** If `Throw()` is called without any arguments, it will default to a generic server error, with a code of 500. The error message and name will be fetched from an internal errors list. This provides a quick way to signal a generic server error.

	```javascript
	payload.Throw()
	```

2. **Passing Error Code:** If you pass an error code as the first argument, `Throw()` will use this code to look up an error message from the internal errors list. If the error code does not exist in the errors list, it will default to the generic server error (code 500).

	```javascript
	payload.Throw(404)
	```

3. **Passing Error Code and Message:** For more specific error messages, you can pass both an error code and a message. In this case, the error code will still be used to look up an error name from the internal errors list, but the error message will be the custom message you pass in.

	```javascript
	payload.Throw(404, "Page not found")
	```

These options provide flexibility in handling errors and allow you to easily customize the error message to suit the situation. Whether you need a quick, default error or a more specific, custom error, the Lorry class has got you covered.


### Flash Method

```javascript
// SYNTAX
payload.Flash(title, message)
```

The `Flash` method is used to set a flash message on the Lorry instance. Flash messages are typically short-lived messages used to communicate important information to the end user, such as the result of a form submission or an action confirmation. 

Here's how you can use the `Flash` method:

```javascript
payload.Flash('Title', 'This is a flash message')
```

In this example, 'Title' is the title of the flash message, and 'This is a flash message' is the content of the message.

### Method Chaining

One of the key design features of the Lorry class is its support for method chaining. This means you can call one method after another in a continuous line of code, making your code cleaner and more readable.

Every method in the Lorry class (with the exception of the private methods) returns the instance (`this`), which allows you to chain additional method calls. Here is an example:

```javascript
let payload = new Lorry({ key1: 'value1', key2: 'value2' }, { name: 'MyLorry', errorLogging: true, verbose: true })
  .Flash('FlashTitle', 'This is a flash message')
  .Replace({ key5: 'value5' })
  .Throw(404, 'Resource not found', 'NotFound', 2);
```

This will create a Lorry instance, set a flash message, replace all existing key-value pairs with a new one, and throw an error, all in one line of code.


### Kitchen Sink

This section presents a comprehensive example that combines all the functionalities of the `Lorry` class in a single sequence using method chaining.

```javascript
// Import Lorry
import Lorry from 'lorry';

// Instantiate a new Lorry object with initial data and options
let payload = new Lorry({ key1: 'value1', key2: 'value2' }, { name: 'MyLorry', errorLogging: true, verbose: true })
  .Merge({ key3: 'value3', key4: 'value4' })
  .Replace({ key5: 'value5' })
  .Flash('FlashTitle', 'This is a flash message')
  .Throw(404, 'Resource not found', 'NotFound', 2);

// Directly set a key on the instance
payload.title = 'My Great Title';

// Directly set a key on the instance to a function and run it
payload.myFunction = () => 'Hello, World!';
console.log(lorry.myFunction());

// Log the resulting Lorry object
console.log(payload);

```

**Result**
```javascript
{
	flash: {
		title: 'FlashTitle',
		message: 'This is a flash message'
  	},
	key5: 'value5',
	title: 'My Great Title',
	myFunction: [Function],
	err: {
		name: 'NotFound',
		code: 404,
		message: 'Resource not found',
		level: 2
	}
}
```

After running the above code, the lorry object will contain the newly merged data, the flash message, the developer note, the title, the function, and the error message. Note that the Replace method clears the previous data and the flash message from the instance. The error message set by the Throw method can be used for error handling.


### Checking for Errors and Flash Messages

The `Throw()` and `Flash()` methods provide a convenient way to track if an error has occurred or if a flash message has been set in the Lorry instance. Each of these methods adds a distinct key to the instance (`err` for `Throw()`, `flash` for `Flash()`) with corresponding details.

You can use this feature for easy truthy checks in your code. This is especially useful for quickly identifying if an error has occurred or if there's a flash message to be displayed.

For example, if you want to check if an error has been thrown, you can do:

```javascript
if (payload.err) {
  console.log('There was an error!')
}
```

In the same vein, you can check if a flash message has been set:

```javascript
if (payload.flash) {
  console.log('There is a flash message to display!')
}
```

Remember, the `err` and `flash` keys will hold the details of the error or flash message. This makes it easy to handle them accordingly, whether you need to display an error message to the user or log the details for debugging.

## Conclusion

In conclusion, the `Lorry` class serves as a versatile tool for managing key-value pair data in a JavaScript ES6 environment. It was designed with user-friendliness and flexibility in mind, and it shines in applications where payloads need to be passed between functions, particularly in scenarios involving user-facing information display. Whether you're merging, replacing, or resetting data, `Lorry` ensures efficient and effective handling. The provided methods even assist in generating flash messages for end-users and development messages for developers, and they allow for easy error checking with the `Throw()` method. By facilitating method chaining, it promotes clean and maintainable code. We hope that you find `Lorry` as useful in your projects as it has been in ours, and we welcome any feedback or contributions that can help improve its functionality. Happy coding!