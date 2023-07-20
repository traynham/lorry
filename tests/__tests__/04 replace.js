import { describe, expect, beforeEach, it, test } from '@jest/globals'

import Lorry from '../../src/lorry.js'

describe('Replace', () => {

	let lorry
  
	beforeEach(() => {
		lorry = new Lorry()
	})

	it('should replace correctly', () => {
		lorry.Merge({key1: 'value1', key2: 'value2'})
		lorry.Replace({key3: 'value3'})
		expect(lorry.key1).toBeUndefined()
		expect(lorry.key2).toBeUndefined()
		expect(lorry.key3).toBe('value3')
	})

	it('should overwrite existing keys with new keys', () => {
		lorry.Merge({key1: 'value1', key2: 'value2'})
		lorry.Replace({key1: 'new_value1'})
		expect(lorry.key1).toBe('new_value1')
		expect(lorry.key2).toBeUndefined()
	})

	test('Should correctly replace values', () => {
		const lorry = new Lorry({
			name: 'Test',
			count: 5,
		})
		lorry.Replace({
			name: 'New Test',
			count: 10,
		})
		expect(lorry.name).toBe('New Test')
		expect(lorry.count).toBe(10)
	})
	
	test('Should not leave old properties after Replace', () => {
		const lorry = new Lorry({
			name: 'Test',
			count: 5,
			oldProp: 'should be removed',
		})
		lorry.Replace({
			name: 'New Test',
			count: 10,
		})
		expect(lorry.oldProp).toBeUndefined()
	})

})