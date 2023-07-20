import { describe, expect, beforeEach, it, jest, test } from '@jest/globals'

import Lorry from '../../src/lorry.js'

jest.spyOn(console, 'log').mockImplementation(() => {})

describe('Flash', () => {

	let lorry
  
	beforeEach(() => {
		lorry = new Lorry()
	})
	
	it('should set flash correctly', () => {
		lorry.Flash('title', 'message')
		expect(lorry.flash).toEqual({title: 'title', message: 'message'})
	})

	it('should return "this" after setting flash', () => {
		const response = lorry.Flash('title', 'message')
		expect(response).toBe(lorry);
	})
	
	test('provides options for initialization', () => {
		const lorry = new Lorry({}, { name: 'MyLorry', errorLogging: true, verbose: true })
		lorry.Flash('TestTitle', 'TestMessage')
		expect(console.log).toHaveBeenCalledWith('MyLorry › Flash › TestTitle: TestMessage')
	})
	
	test('logs verbose messages based on verbose option', () => {
		const lorry = new Lorry({}, { verbose: true })
		lorry.Flash('TestTitle', 'TestMessage')
		expect(console.log).toHaveBeenCalledWith(' › Flash › TestTitle: TestMessage')
	})
	
	test('does not log verbose messages when verbose option is false', () => {
		const lorry = new Lorry({}, { verbose: false })
		lorry.Flash('TestTitle', 'TestMessage')
		expect(console.log).not.toHaveBeenCalled()
	})
	
})