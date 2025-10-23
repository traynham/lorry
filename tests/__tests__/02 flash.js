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
		expect(response).toEqual(lorry);
	})
	
	test('provides options for initialization', () => {
		const lorry = new Lorry({}, { name: 'MyLorry', errorLogging: true, verbose: true })
		console.log.mockClear();
		lorry.Flash('TestTitle', 'TestMessage')
		expect(console.log).toHaveBeenCalledWith(
			'MyLorry › Flash › ' + JSON.stringify({ title: 'TestTitle', message: 'TestMessage' })
		)
	})
	
	test('logs verbose messages based on verbose option', () => {
		const lorry = new Lorry({}, { verbose: true })
		lorry.Flash('TestTitle', 'TestMessage')
		expect(console.log).toHaveBeenCalledWith(
			' › Flash › ' + JSON.stringify({ title: 'TestTitle', message: 'TestMessage' })
		)
	})
	
	test('does not log verbose messages when verbose option is false', () => {
		const lorry = new Lorry({}, { verbose: false })
		console.log.mockClear();
		lorry.Flash('TestTitle', 'TestMessage')
		expect(console.log).not.toHaveBeenCalled()
	})
	
})


it('sets flash with (message) signature', () => {
	const l = new Lorry()
	l.Flash('onlyMessage')
	expect(l.flash).toEqual({ message: 'onlyMessage' })
})

it('sets flash with (title, message, fields) and shallow merges', () => {
	const l = new Lorry()
	l.Flash('t', 'm', { type: 'success', code: 42 })
	expect(l.flash).toEqual({ title: 't', message: 'm', type: 'success', code: 42 })
})

it('sets flash with (message, fields) signature', () => {
	const l = new Lorry()
	l.Flash('m', { type: 'danger' })
	expect(l.flash).toEqual({ message: 'm', type: 'danger' })
})

it('sets flash with (fields) only', () => {
	const l = new Lorry()
	l.Flash({ type: 'info', tag: 'alpha' })
	expect(l.flash).toEqual({ type: 'info', tag: 'alpha' })
})

describe('session integration (single-slot per id)', () => {
	it('writes to session under default id and consumes on next Flash()', () => {
		const session = {}
		const w = new Lorry({}, { session })         // default id: 'default'
		w.Flash('Saved', 'All good', { type: 'ok' })
		expect(session.flash.default).toEqual({ title:'Saved', message:'All good', type:'ok' })
		
		const r = new Lorry({}, { session })         // same default id
		r.Flash() // GET mode
		expect(r.flash).toEqual({ title:'Saved', message:'All good', type:'ok' })
		expect(session.flash?.default).toBeUndefined()
		// optional: container removed when empty
		expect(session.flash).toEqual({})
	})

	it('uses custom id to isolate entries', () => {
		const session = {}
		new Lorry({}, { session, id: 'formA' }).Flash('A', 'msgA')
		new Lorry({}, { session, id: 'formB' }).Flash('B', 'msgB')
		
		expect(session.flash.formA).toEqual({ title:'A', message:'msgA' })
		expect(session.flash.formB).toEqual({ title:'B', message:'msgB' })
		
		const a = new Lorry({}, { session, id: 'formA' })
		a.Flash() // consume A only
		expect(a.flash).toEqual({ title:'A', message:'msgA' })
		expect(session.flash.formA).toBeUndefined()
		expect(session.flash.formB).toEqual({ title:'B', message:'msgB' })
	})

	it('does nothing on GET when no session entry exists', () => {
		const session = {}
		const l = new Lorry({}, { session, id: 'missing' })
		l.Flash() // GET mode with nothing to consume
		expect(l.flash).toBeUndefined()
		expect(session.flash ?? {}).toEqual({})
	})

})

describe('verbose output shape (JSON.stringify payload)', () => {
	
	it('logs stringified flash when verbose=true', () => {
		const l = new Lorry({}, { name: 'MyLorry', verbose: true })
		l.Flash('TestTitle', 'TestMessage')
		expect(console.log).toHaveBeenCalledWith('MyLorry › Flash › ' + JSON.stringify({ title:'TestTitle', message:'TestMessage' }))
	})

	it('logs JSON for merged fields', () => {
		const l = new Lorry({}, { verbose: true })
		l.Flash('t', 'm', { type:'ok' })
		expect(console.log).toHaveBeenCalledWith(' › Flash › ' + JSON.stringify({ title:'t', message:'m', type:'ok' }))
	})
	
})