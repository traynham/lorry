import { describe, expect, beforeEach, it, test } from '@jest/globals'

import Lorry from '../../src/lorry.js'

describe('Reset', () => {

	let lorry
  
	beforeEach(() => {
		lorry = new Lorry()
	})

	it('should reset correctly', () => {
		lorry.Merge({key1: 'value1', key2: 'value2'})
		lorry.Reset()
		expect(lorry.key1).toBeUndefined()
		expect(lorry.key2).toBeUndefined()
	})

	it('should not delete class methods when reset', () => {
		lorry.Reset()
		expect(typeof lorry.Flash).toBe('function')
		expect(typeof lorry.Merge).toBe('function')
	})
	
	test('Should correctly reset values', () => {
		const lorry = new Lorry({
			name: 'Test',
			count: 5,
		})
		lorry.Reset()
		expect(lorry.name).toBeUndefined()
		expect(lorry.count).toBeUndefined()
	})

})