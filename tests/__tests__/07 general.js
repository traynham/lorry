//import { describe, expect, test } from '@jest/globals'
import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals'

import Lorry from '../../src/lorry.js'

describe('General Testing', () => {
	
	// Testing setting a function on Lorry instance
	test('Should correctly assign and execute function on Lorry instance', () => {
		const lorry = new Lorry()
		lorry.greet = function(name) {
			return `Hello, ${name}! Welcome to Lorry instance.`
		}
		expect(lorry.greet('John')).toBe("Hello, John! Welcome to Lorry instance.")
	})
	
	// Testing setting an arrow function on Lorry instance
	test('Should correctly assign and execute arrow function on Lorry instance', () => {
		const lorry = new Lorry()
		lorry.sayGoodbye = name => `Goodbye, ${name}! Leaving Lorry instance.`
		expect(lorry.sayGoodbye('John')).toBe("Goodbye, John! Leaving Lorry instance.")
	})
	
	// Test to check assignment and retrieval of a string
	test('Should correctly assign and retrieve a string key', () => {
		const lorry = new Lorry()
		lorry.title = 'My Great Title'
		expect(lorry.title).toBe('My Great Title')
	})
	
	// Test to check assignment and retrieval of an integer
	test('Should correctly assign and retrieve an integer key', () => {
		const lorry = new Lorry()
		lorry.count = 5
		expect(lorry.count).toBe(5)
	})
	
	// Test to check assignment and retrieval of an object
	test('Should correctly assign and retrieve an object key', () => {
		const lorry = new Lorry()
		lorry.config = { maxSpeed: 60, color: 'blue' }
		expect(lorry.config).toEqual({ maxSpeed: 60, color: 'blue' })
	})

})

describe('Protected proxy traps', () => {
  let errSpy, logSpy
  beforeEach(() => {
	errSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
	logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })
  afterEach(() => {
	errSpy.mockRestore()
	logSpy.mockRestore()
  })

  test('blocks overwriting a method via set trap (logs when errorLogging=true)', () => {
	const l = new Lorry({}, { name: 'L', errorLogging: true })
//	const original = l.Merge
	// attempt overwrite
	l.Merge = 123
	// still the original function
	expect(typeof l.Merge).toBe('function')
//	expect(l.Merge).toBe(original)
	// logged once
	expect(console.error).toHaveBeenCalledTimes(1)
	expect(console.error.mock.calls[0][0]).toMatch(/L › SET BLOCKED: cannot overwrite method "Merge"/)
  })

  test('allows setting a non-method property via set trap', () => {
	const l = new Lorry({}, { verbose: true }) // verbose shouldn’t be needed for allow-path
	l.foo = 42
	expect(l.foo).toBe(42)
	// no error log
	expect(console.error).not.toHaveBeenCalled()
  })

  test('blocks defineProperty on a method (logs when verbose=true)', () => {
	const l = new Lorry({}, { name: 'L', verbose: true })
//	const original = l.Flash
	Object.defineProperty(l, 'Flash', { value: 'nope', configurable: true })
	expect(typeof l.Flash).toBe('function')
//	expect(l.Flash).toBe(original)
	expect(console.error).toHaveBeenCalledTimes(1)
	expect(console.error.mock.calls[0][0]).toMatch(/L › DEFINE BLOCKED: cannot overwrite method "Flash"/)
  })

  test('allows defineProperty for non-method keys', () => {
	const l = new Lorry()
	Object.defineProperty(l, 'bar', { value: 'ok', configurable: true })
	expect(l.bar).toBe('ok')
	expect(console.error).not.toHaveBeenCalled()
  })

  test('blocks deleteProperty on a method (logs)', () => {
	const l = new Lorry({}, { name: 'L', verbose: true })
//	const original = l.Reset
	// attempt delete
	// eslint-disable-next-line no-unused-expressions
	delete l.Reset
	expect(typeof l.Reset).toBe('function')
//	expect(l.Reset).toBe(original)
	expect(console.error).toHaveBeenCalledTimes(1)
	expect(console.error.mock.calls[0][0]).toMatch(/L › DELETE BLOCKED: cannot overwrite method "Reset"/)
  })

  test('deleteProperty on non-method key succeeds', () => {
	const l = new Lorry()
	l.tmp = 1
	// eslint-disable-next-line no-unused-expressions
	delete l.tmp
	expect(l.tmp).toBeUndefined()
	expect(console.error).not.toHaveBeenCalled()
  })

  test('get trap preserves private fields AND chaining identity', () => {
	const l = new Lorry({}, { verbose: true })
	// Ensure calling methods works (private #OPT access) and returns the proxy for chaining
	const chained = l.Flash('t', 'm').Merge({ a: 1 }).Throw(400, 'bad')
	expect(chained).toEqual(l)              // identity stays as proxy
	expect(l.flash).toEqual({ title: 't', message: 'm' })
	expect(l.a).toBe(1)
	expect(l.err).toMatchObject({ code: 400 })
  })
})