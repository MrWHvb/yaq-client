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
		// console.log(this._block);
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
		// console.log(this._block);
	}

	testStack() {
		this.closeBlock();
		return this._stack;
	}
}

module.exports = Report;
