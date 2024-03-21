class comExec {
	constructor() {
    this.commandList = {};  
			const readdirSync = (p, a = []) => {
				if (fs.statSync(p).isDirectory()) fs.readdirSync(p).map(f => readdirSync(a[a.push(path.join(p, f)) - 1], a));
					return a;
			}
				readdirSync(__dirname).forEach((file) => {
					if (file == __filename) return;
					const pathParse = path.parse(file);
						if (pathParse.ext !== '.js') return;
					const command = require(file);
						this.commandList[command.name] = {
							name: command.name,
								description: command.description,
									execute: command.execute,
										path: file,
						};
				});
	}
	
	async exec(name, data) {
		try { return this.commandList[name].execute(data); } 
			catch(e) { throw new Error('Command not found!', { e: e }); }
	}
}

module.exports = comExec;

