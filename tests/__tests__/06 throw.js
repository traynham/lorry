import { describe, expect, beforeEach, it, test, jest } from '@jest/globals'

import Lorry from '../../src/lorry.js'
import errors from '../../src/errors.js'

jest.spyOn(console, 'error').mockImplementation(() => {})

describe('Throw', () => {

	let lorry
  
	beforeEach(() => {
		lorry = new Lorry()
	})
	
	it('should set error correctly', () => {
		lorry.Throw(404)
		const error404 = errors[404]
		expect(lorry.err).toEqual({
			name: error404.name,
			code: 404,
			message: error404.description,
			level: 0
		})
	})

	it('should set custom error correctly', () => {
		lorry.Throw(999, 'custom error', 'CustomError', 2)
		expect(lorry.err).toEqual({
			name: 'CustomError',
			code: 999,
			message: 'custom error',
			level: 2
		})
	})

	it('should default to error 500 when thrown with an undefined error code', () => {
		lorry.Throw(999)
		const error500 = errors[500]
		expect(lorry.err).toEqual({
			name: error500.name,
			code: 999,
			message: error500.description,
			level: 0
		})
	})

	it('should return "this" after throwing error', () => {
		const response = lorry.Throw(404)
		expect(response).toEqual(lorry)
	})
	
	test('Should correctly set error message', () => {
		const lorry = new Lorry()
		lorry.Throw(404, 'Not Found', 'NotFound')
		expect(lorry.err).toEqual({
			name: 'NotFound',
			code: 404,
			message: 'Not Found',
			level: 0,
		})
	})

	test('Should fallback to default error message if not provided', () => {
		const lorry = new Lorry()
		lorry.Throw(404)
		expect(lorry.err).toEqual({
			name: 'NotFound',
			code: 404,
			message: 'The server has not found anything matching the Request-URI.',
			level: 0,
		})
	})

	it('should default to 500 when no code is passed.', () => {
		lorry.Throw()
		const error500 = errors[500]
		expect(lorry.err).toEqual({
			name: error500.name,
			code: 500,
			message: error500.description,
			level: 0
		})
	})
	
	test('logs errors when errorLogging option is true', () => {
		const lorry = new Lorry({}, { name: 'MyLorry', errorLogging: true })
		lorry.Throw(500)
		const error = errors[500]
		expect(console.error).toHaveBeenCalledWith(`MyLorry › ERROR 500 ${error.name}: ${error.description}`)
	})
	
	test('does not log errors when errorLogging option is false', () => {
		const lorry = new Lorry({}, { name: 'MyLorry', errorLogging: false })
		lorry.Throw(500)
		expect(console.error).not.toHaveBeenCalled()
	})
	
	test('test simple message signature', () => {
		const lorry = new Lorry({}, { name: 'MyLorry', errorLogging: false })
		lorry.Throw('Use a string to throw an error')
		expect(lorry.err.message).toBe('Use a string to throw an error')
	})
	
	it('test more complex message signature', () => {
		lorry.Throw('Use a string to throw an error', 'Test Lorry', 5)
		expect(lorry.err).toEqual({
			name: 'Test Lorry',
			code: 500,
			message: 'Use a string to throw an error',
			level: 5
		})
	})

})