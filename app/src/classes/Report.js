class Report {
	constructor() {
		this._stack = [];

		this._block = null;
	}

	newBlock(name, description) {
		this.closeBlock();

		this._block = {
			name: name,
			description: description,
			results: []
		}
	}

	closeBlock() {
		if(this._block) {
			this._stack.push(this._block);
			this._block = null;
		}
	}

	success(string) {
		this._block.results.push({
			action: string,
			success: true,
			error: null
		})
		console.log(this._block);
	}

	error(string, err) {
		this._block.results.push({
			action: string,
			success: false,
			error: {
				message: err.message.split('\n'),
				name: err.name,
				stack: err.stack.split('\n')
			}
		})
		console.log(this._block);
	}

	testStack() {
		this.closeBlock();
		return this._stack;
	}
}

module.exports = Report;

// class Report {
// 	constructor() {
// 		// стек результатів тестування
// 		this._stack = [];
//
// 		// блок тестування, наприклад
// 		this._block = null;
//
// 		this._nullblock = {
// 			name: null, // string
// 			description: null, //string
// 			results: [] // array
// 		}
//
// 		console.log(`Stack: ${this.stack}`);
// 	}
//
// 	get stack() {
// 		return this._stack;
// 	}
//
// 	get block() {
// 		return this._block;
// 	}
// 	createBlock() {
// 		this._block = this._nullblock;
// 	}
// 	setBlockName(string) {
// 		if(this.block != null) {
// 			this._block.name = string;
// 		}
// 		else {
// 			console.log('Can not apply name. Block is closed. Create new block!');
// 		}
// 	}
// 	setBlockDescription(string) {
// 		if(this.block != null) {
// 			this._block.description = string;
// 		}
// 		else {
// 			console.log('Can not apply description. Block is closed. Create new block!');
// 		}
// 	}
// 	success(string) {
// 		if(this.block != null) {
// 			this._block.results.push({
// 				action: string,
// 				success: true,
// 				error: null
// 			})
// 		}
// 		else {
// 			console.log('Can not add success to results. Block is closed. Create new block!');
// 		}
// 	}
// 	error(string, errobj) {
// 		if(this.block != null) {
// 			console.log(this.block.results);
// 			this._block.results.push({
// 				action: string,
// 				success: false,
// 				error: errobj
// 			})
// 		}
// 		else {
// 			console.log('Can not add error to results. Block is closed. Create new block!');
// 		}
// 	}
//
// 	closeBlock() {
// 		console.log('Close block is called!', this.block, this._block);
// 		if(this.block != null) {
// 			this._stack.push(this.block);
// 			this._block = null;
// 			console.log('Close block...');
// 			// console.log(this.stack);
// 		}
// 		else {
// 			console.log('Block is closed!');
// 		}
// 	}
//
// 	newBlock(name, description) {
// 		this.closeBlock();
//
// 		this.createBlock();
//
// 		this.setBlockName(name);
//
// 		this.setBlockDescription(description);
// 	}
//
// 	results() {
// 		this.closeBlock();
//
// 		return this.stack;
// 	}
// }
//
// module.exports = Report;
