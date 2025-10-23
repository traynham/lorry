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
			session: opt.session || null,
			name: opt.name || '',
			errorLogging: opt.errorLogging || false,
			verbose: opt.verbose || false,
			id: opt.id ?? 'default' 
		}
		
		// MERGE INITIAL INSTANCE OBJ
		this.Merge(obj)
		
		// Return proxied instance
		return this.#createProtectedProxy()
		
	}
	
	#createProtectedProxy() {
		
		const proto = Object.getPrototypeOf(this)
		const methodNames = new Set(
			Object.getOwnPropertyNames(proto).filter(k => typeof this[k] === 'function')
		)
		
		const logBlocked = (kind, prop) => {
			if (this.#OPT.errorLogging || this.#OPT.verbose) {
				console.error(`${this.#OPT.name} › ${kind} BLOCKED: cannot overwrite method "${String(prop)}"`)
			}
		}
		
		const target = this
	
		return new Proxy(target, {
			
			// 🔑 Make methods run with `this === target` (has #OPT)
			get(t, prop, receiver) {
				const value = Reflect.get(t, prop, receiver)
				return (typeof value === 'function') ? value.bind(t) : value
			},
			
			set(t, prop, value, receiver) {
				if (methodNames.has(prop)) {
					logBlocked('SET', prop)
					return true
				}
				return Reflect.set(t, prop, value, receiver)
			},
		
			defineProperty(t, prop, descriptor) {
				if (methodNames.has(prop)) {
					logBlocked('DEFINE', prop)
					return true
				}
				return Reflect.defineProperty(t, prop, descriptor)
			},
		
			deleteProperty(t, prop) {
				if (methodNames.has(prop)) {
					logBlocked('DELETE', prop)
					return true
				}
				return Reflect.deleteProperty(t, prop)
			}
		})
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
	
	// A helper function to check if a value is an object (but not an array).
	_isObject(obj) {
		return obj && typeof obj === 'object' && !Array.isArray(obj)
	}
	
	// Deep merge two or more javascript objects.
	_merge(target, ...sources) {
		
		sources.forEach(source => {
			if (this._isObject(source)) {
				Object.keys(source).forEach(key => {
					if (this._isObject(source[key])) {
						if (!target[key]) {
							target[key] = {};
						}
						this._merge(target[key], source[key]);
					} else {
						target[key] = source[key];
					}
				});
			}
		});
		
		return target;
		
	}
	
	
	_verbose(msg) {
		if(this.#OPT.verbose){
			console.log(
				`${this.#OPT.name} › ${msg}`
			)
		}
	}


	// The Flash() method sets a flash message on the instance.
	Flash(title, message, fields){
		
		let isEmpty = v => v == null || (typeof v === 'string' ? v.trim() === '' : v === '');
		let isGet = (isEmpty(title) && isEmpty(message))
		let session = this.#OPT.session || null
		let id = this.#OPT.id
		
		if(session && !session.flash){
			session.flash = {}
		}
		
		// IF ONLY FIELDS
		if (typeof title === 'object') {
			fields = title 
			message = undefined
			title = undefined
		}
		
		// IF NO TITLE
		if (typeof message === 'object') {
			fields = message 
			message = title
			title = undefined
		}
		
		// IF ONLY MESSAGE
		if (typeof message === 'undefined') {
			message = title
			title = undefined
		}
		
		if(isGet && session?.flash){
			
			this.flash = session.flash[id]
			delete session.flash[id]
			
		} else {
			
			this.flash = {
				title: title,
				message: message,
				...fields
			}
			
			this.flash = Object.fromEntries(
				Object.entries(this.flash).filter(([_, v]) => v !== undefined)
			);
			
		}
		
		// IF EMPTY FLASH - NOTE: THIS CODE IS NEVER REACHED AT THIS POINT.
		//if(this.flash && Object.keys(this.flash).length == 0){
		//	delete this.flash
		//}
		
		if(session && !isGet && this.flash){
			session.flash[id] = this.flash
		}
		
		this._verbose(`Flash › ${JSON.stringify(this.flash)}`)
		
		return this
		
	}
	
	
	// The Merge() method performs a deep merge of the instance with 
	// the provided object, without overriding methods.
	Merge(obj = {}){
		
		// Clean the pairs object before merging.
		const cleanObj = this._cleanObj(obj)

		this._merge(this, cleanObj)
		
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
		
		// If the code is a string, rearrange the parameters and set default values (Reset the signature)
		if(typeof code === 'string'){
			level = name
			name = message
			message = code
			code = 500
		}
		
		// Get the error from the predefined errors list using the code
		let error = errors[code]
		
		// If a custom code is used or the error code does not exist in our errors list, 
		// default to error 500
		if (!error) {
			error = errors[500]
		}
		
		// Construct the error object with the given parameters, or defaults from the error list.
		this.err = {
			name: name || error.name,
			code: code,
			message: message || error.description,
			level
		}
		
		// If error logging is enabled, log the error to the console.
		if(this.#OPT.errorLogging){
			console.error(
				`${this.#OPT.name} › ERROR ${this.err.code} ${this.err.name}: ${this.err.message}`
			)
		}
		
		// Return the current object, allowing for method chaining.
		return this
		
	}

}


export default Lorry