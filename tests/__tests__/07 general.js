import { describe, expect, test } from '@jest/globals'

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