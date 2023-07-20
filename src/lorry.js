import merge from 'lodash/merge.js';
import errors from './errors.js'


// The Lorry class is designed to manage key-value pair data, providing 
// methods for merging, replacing, resetting, and error handling.
class Lorry {

	#OPT

	// The constructor initiates the class with a set of key-value pairs,
	// if provided.
	constructor(obj, opt = {}) {
		
		// SET OPTIONS
		this.#OPT = {
			name: opt.name || '',
			errorLogging: opt.errorLogging || false,
			verbose: opt.verbose || false
		}
		
		// MERGE INITIAL INSTANCE OBJ
		this.Merge(obj)
		
	}
	
	
	// The _cleanObj() method takes an object as an argument and removes
	// any keys from it that match method names in the Lorry class, preventing 
	// overriding of class methods.
	_cleanObj(obj) {
		
		// Get the property names of the prototype, including its methods.
		const instanceProps = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
		
		// Remove any property from obj that matches a method of the instance.
		instanceProps.forEach(item => { 
			if(typeof this[item] === 'function') {
				delete obj[item]
			}
		})
		
		return obj
		
	}
	
	
	_verbose(msg) {
		if(this.#OPT.verbose){
			console.log(
				`${this.#OPT.name} › ${msg}`
			)
		}
	}


	// The Flash() method sets a flash message on the instance.
	Flash(title, message){
		
		this.flash = {
			title: title,
			message: message
		}
		
		this._verbose(`Flash › ${this.flash.title}: ${this.flash.message}`)
		
		return this
		
	}
	
	
	// The Merge() method performs a deep merge of the instance with 
	// the provided object, without overriding methods.
	Merge(obj = {}){
		
		// Clean the pairs object before merging.
		const cleanObj = this._cleanObj(obj)
		
		merge(this, cleanObj)
		
		this._verbose(`Merge › ${JSON.stringify(obj)}`)
		
		return this
		
	}
	
	
	// The Replace() method resets the instance and then merges it with 
	// the provided object.
	Replace(obj){
		
		this.Reset()
		this.Merge(obj)
		
		return this
		
	}


	// The Reset() method clears all keys from the instance.
	Reset(){
			
		// DELETE ALL KEYS
		for(let item in this){
			delete this[item]
		}
		
		this._verbose(`Reset`)
		
		return this
		
	}


	// The Throw() method sets an error message on the instance, 
	// with defaults to a generic server error (code 500) if no code is provided.
	Throw(code = 500, message, name, level = 0) {
		
		let error = errors[code]
		
		// If a custom code is used or the error code does not exist in our errors list, 
		// default to error 500
		if (!error) {
			error = errors[500]
		}
		
		this.err = {
			name: name || error.name,
			code: code,
			message: message || error.description,
			level
		}
		
		if(this.#OPT.errorLogging){
			console.error(
				`${this.#OPT.name} › ERROR ${this.err.code} ${this.err.name}: ${this.err.message}`
			)
		}
		
		return this
		
	}

}


export default Lorry