const path = require('path');
const webpack = require('webpack');


module.exports = environment => {
	const env = Object.assign({}, environment);
	env.dev = env.dev || false;

	const config = {
		devtool: 'inline-source-map',

		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					include: [
						path.resolve(__dirname, 'src'),
					],
				},
				{
					test: /\.styl$/,
					loader: 'style-loader!css-loader!stylus-loader',
					include: [
						path.resolve(__dirname, 'src'),
					],
				},
			]
		},

		entry: {
			app: ['./src/index.js'],
		},

		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist/static'),
		},

		devServer: {
			contentBase: path.join(__dirname, 'dist'),
			port: 3000,
			host: '0.0.0.0',
			compress: true,
			https: false,
			historyApiFallback: true,
			disableHostCheck: true,
		},

	};

	return config;
};
