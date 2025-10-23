# Lorry

A versatile JavaScript ES6 class for managing key-value pair data.  
It provides a clean and powerful way to merge, replace, reset, and shape your data while also offering built-in error handling, flash messaging, and proxy-based method protection.

---

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
  - [Import](#import)
  - [Constructor Signature](#constructor-signature)
  - [Creating a Simple Instance](#creating-a-simple-instance)
  - [Creating an Instance with Data and Options](#creating-an-instance-with-data-and-options)
  - [Merging Keys](#merging-keys)
  - [Replacing Keys](#replacing-keys)
  - [Resetting Keys](#resetting-keys)
  - [Accessing and Modifying Keys Directly](#accessing-and-modifying-keys-directly)
  - [Error Handling](#error-handling)
  - [Flash Messages](#flash-messages)
  - [Method Chaining](#method-chaining)
  - [Kitchen Sink (Standalone Example)](#kitchen-sink-standalone-example)
  - [Kitchen Sink (Express Example)](#kitchen-sink-express-example)
  - [Checking for Errors and Flash Messages](#checking-for-errors-and-flash-messages)
- [What’s New in This Version](#whats-new-in-this-version)
- [License](#license)

---

## Introduction

The **Lorry** class provides a flexible and intuitive approach to managing key-value pair data.  
It’s especially useful for managing payloads passed between functions — for example, Express render calls or response objects.

Lorry can merge new data, replace existing data, or completely reset itself. It also supports flash messages and structured error handling, making it a reliable bridge between application logic and presentation.

---

## Installation

Install using **npm**:

```bash
npm i @jessetraynham/lorry
```

<br>

## Usage

### Import

Once installed, import it like any ES6 module:

```js
import Lorry from '@jessetraynham/lorry'
```

### Constructor Signature

The Lorry class constructor follows this simple pattern:

```js
let payload = new Lorry(obj, opt)
```

Both parameters are **optional**, making Lorry flexible for everything from quick scripts to structured applications.

| Parameter | Type | Default | Description |
|------------|------|----------|-------------|
| **obj** | Object | `{}` | An initial set of key–value pairs to merge into the instance when created. |
| **opt** | Object | `{}` | A configuration object that controls things like verbosity, session handling, and error logging. |

You can use either, both, or neither:

```js
new Lorry()                                // empty, default options  
new Lorry({ title: 'Hello' })              // starts with data  
new Lorry({}, { verbose: true })           // no data, but verbose logging enabled  
new Lorry({ key: 'value' }, { name: 'Main' }) // both data and options
```

Internally, Lorry stores its options in a private field and immediately merges the provided object into the instance.

Every instance you create is wrapped in a proxy that protects built-in methods from being overwritten.


### Creating a Simple Instance

The quickest way to start using **Lorry** is without any options at all.  
Both parameters in the constructor — the initial object and the options object — are optional.

```js
import Lorry from '@jessetraynham/lorry'

// Create a simple instance with no arguments
let payload = new Lorry()

// Add some data
payload.title = 'My Great Title'
payload.year = 1974

console.log(payload)
// → { title: 'My Great Title', year: 1974 }
```

You can also pass an initial object if you want to start with data:

```js
let payload = new Lorry({ title: 'Initial Title', genre: 'Science Fiction' })

console.log(payload.title)
// → Initial Title
```

Lorry works as a regular JavaScript object here — you can set, read, or delete keys directly.
All its extra features (merging, replacing, flash messages, and errors) are available later if you decide to expand your usage.

### Creating an Instance with Data and Options

```js
let payload = new Lorry(obj, opt)
```

You can create a new instance of `Lorry` with optional data and configuration:

```js
let payload = new Lorry(
  { key1: 'value1', key2: 'value2' },
  {
	name: 'MyLorry',
	errorLogging: true,
	verbose: true,
	session: req.session, // optional (for Express)
	id: 'flashID' // optional unique identifier for flash messages
  }
)
```

#### Options
| Option | Type | Default | Description |
| ------- | ---- | -------- | ----------- |
| `session` | Object | `null` | Enables flash persistence using an Express session. This is simply a mutable javascript object, so it can be used with other session-like systems. |
| `name` | String | `''` | Label for log output. |
| `errorLogging` | Boolean | `false` | Logs errors to the console. |
| `verbose` | Boolean | `false` | Logs detailed internal operations. |
| `id` | String | `'default'` | Used to store and retrieve flash messages in a session. |



### Merging Keys

```js
// SYNTAX
payload.Merge(obj)
```

The `Merge()` method performs a **deep merge** of the provided object into the existing instance without overwriting methods or private properties.

	payload.Merge({ key3: 'value3' })

If verbose mode is enabled, the merge action will log the merged content.



### Replacing Keys

```js
// SYNTAX
payload.Replace(obj)
```

`Replace()` first clears all keys, then merges the provided object.

```js
payload.Replace({ key4: 'value4' })
```

This is functionally equivalent to calling:

```js
payload.Reset().Merge({ key4: 'value4' })
```



### Resetting Keys

```js
// SYNTAX
payload.Reset()
```

Removes all keys and values from the instance.

```js
payload.Reset()
```

After calling `Reset()`, your instance is clean and ready to use again.



### Accessing and Modifying Keys Directly

You can assign keys directly on the instance like a regular object:

```js
payload.title = 'My Great Title'
payload.animals = ['goat', 'chicken', 'pig', 'chimpanzee']

console.log(payload.title)
// → My Great Title
```

Lorry automatically protects its internal methods from being overwritten thanks to a proxy-based guard system.

If you attempt to overwrite a method name (like `Merge` or `Reset`), a warning is logged when `verbose` or `errorLogging` is enabled.

---

### Error Handling

```js
// SYNTAX 1
payload.Throw(code)

// SYNTAX 2
payload.Throw(code, message, name, level)

// SYNTAX 3
payload.Throw(message, name, level)
```

Lorry simplifies structured error handling using the `Throw()` method.

Examples:

```js
// Default server error
payload.Throw()

// By error code
payload.Throw(404)

// Custom message
payload.Throw(404, 'Page not found')

// Custom name and level
payload.Throw('Invalid input provided', 'InputError', 'Critical')
```

When `errorLogging` is enabled, the error details are printed to the console:

	MyLorry › ERROR 404 NotFound: Page not found

The resulting error is stored in `payload.err`.

```js
{
  name: 'NotFound',
  code: 404,
  message: 'Page not found',
  level: 2
}
```



### Flash Messages

The `Flash()` method is used to set, retrieve, or store temporary messages on the Lorry instance. These short-lived messages are useful for communicating success, warnings, or errors between page requests or function calls.

---

#### Signatures

```js
payload.Flash(title, message, fields)
payload.Flash(message)
payload.Flash(fields)
payload.Flash()  // retrieves from session (if configured)
```

---

#### Overview

`Flash()` is flexible — it adjusts automatically depending on how you call it.

| Example | Behavior |
|----------|-----------|
| `payload.Flash('Saved!', 'Your profile was updated.')` | Sets a flash with a title and message. |
| `payload.Flash('Form submission failed.')` | Sets a flash with only a message (no title). |
| `payload.Flash({ type: 'error', field: 'email' })` | Sets a flash using a fields object only. |
| `payload.Flash()` | Retrieves and clears a stored flash from the session (if `session` was set in the constructor). |

---

#### Setting a Flash Message

You can set a title and message, or just message:

```js
payload.Flash('Success', 'Profile updated successfully')
```

or simply:

```js
payload.Flash('Profile updated successfully')
```

---

#### Adding Extra Fields

Optional fields can be included for things like message type, affected form field, or redirect hints.

```js
payload.Flash('Error', 'Invalid email address', { type: 'error', field: 'email' })
```

All undefined values are automatically stripped out, leaving only meaningful data.

Resulting structure:

```js
{
  title: 'Error',
  message: 'Invalid email address',
  type: 'error',
  field: 'email'
}
```

---

#### Retrieving from Session

If you provided a session when creating the Lorry instance, you can use `Flash()` with no arguments to **retrieve and remove** the stored flash:

```js
let payload = new Lorry({}, { session: req.session, id: 'notify' })

// Set flash in one request
payload.Flash('Notice', 'Settings saved.')
```

Later, in a subsequent request:

```js
let payload = new Lorry({}, { session: req.session, id: 'notify' })
payload.Flash()

console.log(payload.flash)
// → { title: 'Notice', message: 'Settings saved.' }
```

Once retrieved, the flash is deleted from the session automatically.

---

#### Notes

- All parameters (`title` , `message`, and `fields`) are optional.
- When a `session` is provided, the flash is persisted under `session.flash[id]`.
- If no `session` is configured, the flash remains attached to the current instance only.
- Method returns the Lorry instance, allowing chaining (e.g. `.Flash(...).Merge(...).Throw(...)`).

---

#### Verbose Logging Example

When `verbose: true` is enabled in your constructor options, each call to `Flash()` will log the flash content to the console:

```js
MyLorry › Flash › {"title":"Success","message":"Profile updated successfully"}
```



### Method Chaining

Every method returns the instance itself, allowing you to chain operations for clarity and brevity:

```js
payload
  .Merge({ key1: 'value1' })
  .Flash('FlashTitle', 'This is a flash message')
  .Throw(404, 'Resource not found', 'NotFound', 2)
```



### Kitchen Sink (Standalone Example)

This example demonstrates all the major features of **Lorry** in a single self-contained script.

```js
import Lorry from '@jessetraynham/lorry'

let payload = new Lorry(
  { key1: 'value1', key2: 'value2' },
  { name: 'MyLorry', errorLogging: true, verbose: true }
)
.Merge({ key3: 'value3', key4: 'value4' })
.Replace({ key5: 'value5' })
.Flash('FlashTitle', 'This is a flash message')
.Throw(404, 'Resource not found', 'NotFound', 2)

payload.title = 'My Great Title'
payload.myFunction = () => 'Hello, World!'

console.log(payload.myFunction())
console.log(payload)
```

**Result:**

```js
{
  flash: { title: 'FlashTitle', message: 'This is a flash message' },
  key5: 'value5',
  title: 'My Great Title',
  myFunction: [Function],
  err: { name: 'NotFound', code: 404, message: 'Resource not found', level: 2 }
}
```

---

### Kitchen Sink (Express Example)

This version demonstrates how **Lorry** integrates cleanly into an Express app —  
first to **set** a flash message in one route, and then to **retrieve** it in another.

```js
import express from 'express'
import session from 'express-session'
import Lorry from '@jessetraynham/lorry'

const app = express()

app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true
}))

// ───────────────────────────────
// 1️⃣  SET FLASH MESSAGE
// ───────────────────────────────
app.get('/set', (req, res) => {

  const payload = new Lorry(
	{ key1: 'value1', key2: 'value2' },
	{ 
	  name: 'MyLorry',
	  errorLogging: true,
	  verbose: true,
	  session: req.session,
	  id: 'main'
	}
  )
  .Merge({ key3: 'value3' })
  .Flash('Success', 'Profile updated successfully.', { type: 'info' })
  .Throw(404, 'Resource not found', 'NotFound', 2)

  payload.title = 'Flash Set Example'

  console.log('Set flash:', payload.flash)
  res.send('Flash message stored in session. Go to /get to retrieve it.')
})

// ───────────────────────────────
// 2️⃣  GET FLASH MESSAGE
// ───────────────────────────────
app.get('/get', (req, res) => {

  const payload = new Lorry({}, { session: req.session, id: 'main' })
  payload.Flash()  // retrieves and clears from session

  if (payload.flash) {
	console.log('Retrieved flash:', payload.flash)
  } else {
	console.log('No flash found.')
  }

  res.render('index', payload)
})
```

**Result:**

1. Visit `/set` → The flash is created and saved in the session.  
2. Visit `/get` → The flash is retrieved and automatically removed from the session.  

**Console output:**

```js
Set flash: { title: 'Success', message: 'Profile updated successfully.', type: 'info' }
Retrieved flash: { title: 'Success', message: 'Profile updated successfully.', type: 'info' }
```

---

This example illustrates the full session lifecycle:
- `/set` stores a message under `session.flash.id`.
- `/get` loads and deletes it automatically with `payload.Flash()`.
- The same pattern works across redirects, form submissions, or any multi-step workflow.



### Checking for Errors and Flash Messages

You can quickly check whether a flash message or an error exists:

```js
if (payload.err) console.log('There was an error!')
if (payload.flash) console.log('There is a flash message to display!')
```

Each property contains structured data for use in templates or logs.

---

## What’s New in This Version

This release introduces several key improvements and internal rewrites:

1. **Proxy Protection:**  
   Prevents overwriting, redefining, or deleting built-in methods.  
   Safe to assign arbitrary keys without fear of collisions.

2. **Session-Aware Flash:**  
   Flash messages can now persist between requests via an Express session using the new `session` and `id` options.

3. **Verbose Logging:**  
   Granular, opt-in console feedback for all major operations.

4. **Improved `_merge()` Logic:**  
   Rewritten deep merge with object-type checking for reliable nested structures.

5. **Private Fields:**  
   Cleaner internal state management using ES2022 private fields (`#OPT`).

6. **Simplified Error Flow:**  
   The `Throw()` method now gracefully handles any input pattern while retaining the full internal error list.

7. **Removed Lodash Dependency:**  
   The module is now 100% self-contained.

---

## License

[MIT License](./LICENSE)
