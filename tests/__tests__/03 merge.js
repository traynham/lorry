import { describe, expect, beforeEach, it } from '@jest/globals'

import Lorry from '../../src/lorry.js'

describe('Merge', () => {

	let lorry
  
	beforeEach(() => {
		lorry = new Lorry()
	})

	it('should merge correctly', () => {
		lorry.Merge({key1: 'value1'})
		expect(lorry.key1).toBe('value1')
		lorry.Merge({key2: 'value2'})
		expect(lorry.key2).toBe('value2')
	})
	
	it('should merge correctly with deeper objects', () => {
		lorry.Merge({key1: 'value1'})
		expect(lorry.key1).toBe('value1')
		lorry.Merge({key2: 'value2', key3: {one: 'won', two: 'too'}})
		expect(lorry.key2).toBe('value2')
		expect(lorry.key3).toStrictEqual({one: 'won', two: 'too'})
	})

	it('should not overwrite class methods when merging with conflicting keys', () => {
		const obj = { Flash: 'conflict', Merge: 'conflict', Message: 'conflict' }
		lorry.Merge(obj)
		expect(typeof lorry.Flash).toBe('function')
		expect(typeof lorry.Merge).toBe('function')
	})
	
})