const ConcatPlugin = require('webpack-concat-plugin');

class Plugin {
	constructor(options) {
		this.options = options;
		if ('object' !== typeof(this.options)) {
			throw new Error('"options" is not Object');
		}
		this.options.isTracelog = this.options.isTracelog || false;
		// if (!options.output) {
		// 	throw new Error('"options.output" is empty');
		// }
		if (!options.input) {
			throw new Error('"options.input" is empty');
		}
		if (!Array.isArray(options.input)) {
			throw new Error('"options.input" is not Array');
		}
		if ('object' !== typeof(this.options.optionsNewConcatPlugin)) {
			throw new Error('"options.optionsNewConcatPlugin" is not Object');
		}
	}

	apply(compiler) {
		this.tracelog('=====webpack-concat-after-webpack-concat-plugin=====');
		if (this.options.optionsNewConcatPlugin.sourceMap && !this.options.optionsNewConcatPlugin.uglify) {
			this.tracelog(
				'WARNING: Source maps don\'t work without uglify! ',
				"\n" + '_ Cause is "floridoo/concat-with-sourcemaps".',
				"\n" + '_ @see: https://github.com/floridoo/concat-with-sourcemaps/issues/8'
			);
		}
		let optionsNewConcatPlugin = Object.assign({
			filesToConcat: ['']
		}, this.options.optionsNewConcatPlugin);
		let newConcatPlugin = new ConcatPlugin(optionsNewConcatPlugin);
		//this.tracelog('START: ', this.options.output);
		this.tracelog('START: ', `${newConcatPlugin.settings.outputPath}${newConcatPlugin.getFileName()}`);
		let filesToConcat = [];
		this.options.input.forEach((inputPath) => {
			compiler.options.plugins.forEach((plugin) => {
				if (plugin instanceof ConcatPlugin) {
					let pluginOutPath = `${plugin.settings.outputPath}${plugin.getFileName()}`;
					if (inputPath !== pluginOutPath) {
						this.tracelog('SKIP: ', pluginOutPath);
						return;
					}
					plugin.settings.filesToConcat.forEach((filePath) => {
						filesToConcat.push(filePath);
						this.tracelog('ADDED: ', filePath);
					});
				}
			});
		});
		if (filesToConcat.length < 1) {
			this.tracelog('WARNING: can\'t find files to concat.');
		} else {
			this.tracelog('RESULT: ', filesToConcat);

			newConcatPlugin.settings.filesToConcat = filesToConcat;
			compiler.options.plugins.push(newConcatPlugin);
			// let newPlugin = new ConcatPlugin({
			// 	sourceMap: true,
			// 	uglify: true,
			// 	name: 'module-all',
			// 	fileName: '[name].js',
			// 	//outputPath: this.options.output,
			// 	outputPath: '/bundle/',
			// 	filesToConcat: filesToConcat
			// });
			// compiler.options.plugins.push(newPlugin);
		}
		this.tracelog('END: ', this.options.output);
	}

	tracelog(...args) {
		if (!this.options.isTracelog) {
			return;
		}
		console.log.apply(this, args);
	}
}

module.exports = Plugin;