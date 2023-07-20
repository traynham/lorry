import { describe, expect, beforeEach, it, test } from '@jest/globals'

import Lorry from '../../src/lorry.js'

describe('Constructor', () => {
	
	let lorry
  
	beforeEach(() => {
		lorry = new Lorry()
	})

	it('should initialize correctly', () => {
		const obj = {key1: 'value1', key2: 'value2'}
		lorry = new Lorry(obj)
		expect(lorry.key1).toBe('value1')
		expect(lorry.key2).toBe('value2')
	})

	it('should not overwrite class methods when initialized with conflicting keys', () => {
		const obj = { Flash: 'conflict', Merge: 'conflict', Message: 'conflict' }
		lorry = new Lorry(obj)
		expect(typeof lorry.Flash).toBe('function')
		expect(typeof lorry.Merge).toBe('function')
	})
	
	const methods = ['Flash', 'Merge', 'Replace', 'Reset', 'Throw']
	
	test('Should not overwrite methods', () => {
		const lorry = new Lorry({
			Flash: 'new value',
			Merge: 'new value',
			Replace: 'new value',
			Reset: 'new value',
			Throw: 'new value',
		})
		
		methods.forEach(method => {
			expect(typeof lorry[method]).toBe('function')
		})
		
	})
	
})