const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = ({ folders }) => ({
	entry: {
		main: path.join(folders.src, 'index.js'),
	},
	output: {
		path: folders.dist,
		filename: '[name].bundle.js',
	},
	module: {
		rules: [{
			test: /\.js/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [[ 'env', {
						targets: {
							browsers: [ 'last 2 versions' ],
						}
					}]]
				}
			},
		}, {
			test: /\.elm$/,
			exclude: [
				'elm-stuff',
				'node_modules',
			],
			use: [{
				loader: 'elm-webpack-loader',
				options: {
					verbose: true,
					warn: true,
				}
			}]
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(folders.src, 'index.html'),
			filename: 'index.html',
			chunks: [ 'main' ],
		}),
	],
	resolve: {
		modules: [
			folders.src,
			'node_modules',
		]
	},
})
