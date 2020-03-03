// プラグイン
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // sassを.cssで吐き出す
const HtmlWebpackPlugin = require('html-webpack-plugin'); // webpackでhtmlを出力するために使用
const globule = require('globule')

// 開発環境によって切り分ける際に使用するための定数を定義
const ENV = 'development';
const userSourceMap = (ENV === 'development');


const path = require("path")
const context = __dirname
const src = path.join(__dirname, "src")
const srcHtml = path.join(src, "html")
const dist = path.join(__dirname, "dist")
const distHtml = path.join(dist, "html")
const distCss = path.join(dist, "scss")

const documents = globule.find('./src/html/**/*.pug', { ignore: ['./src/html/inc/*.pug'] })
const htmlPluginConfig = documents.map(filename => {
	const template = filename.replace('./src/html/', '')
	return new HtmlWebpackPlugin({
		filename: filename.replace('./src/html/', '').replace('.pug', '.html'),
		template: `${filename}`
	})
})

module.exports = {
	mode: ENV,
	entry: './src/index.js', // メインとなるJavaScriptファイル（エントリーポイント）
	output: {
		path: path.join(__dirname, 'dist'), // 出力ファイルのディレクトリ名
		filename: 'bundle.js', // 出力ファイル名
		publicPath: '', //ブラウザからバンドルにアクセスする際のパス
	},
	devtool: 'inline-source-map',//ブラウザでのデバッグ用にソースマップを出力する
	module: {
		rules: [
			// 拡張子 .js の場合
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader", // Babel を利用する
						options: { // Babel のオプションを指定する
							presets: [
								"@babel/preset-env" // プリセットを指定することで、ES2019 を ES5 に変換
							]
						}
					}
				]
			},
			// 拡張子 .scss の場合
			{
				test: /\.scss/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					use: [
						// CSSをバンドルするための機能
						{
							loader: 'css-loader',
							options: {
								url: false, // CSS内のurl()メソッドの取り込みを禁止する
								sourceMap: true, // ソースマップの利用有無
								//minimize: true, // 空白文字やコメントを削除する
								importLoaders: 2 // Sass+PostCSSの場合は2を指定
							},
						},
						// PostCSSのための設定
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true, // PostCSS側でもソースマップを有効にする
								plugins: [
									// Autoprefixerを有効化
									// ベンダープレフィックスを自動付与する
									require('autoprefixer')({ grid: true })
								]
							},
						},
						// Sassをバンドルするための機能
						{
							loader: 'sass-loader',
							options: {
								sourceMap: userSourceMap, // ソースマップの利用有無
							}
						}
					]
				}),
			},
			// .pug の場合
			{
				test: /\.pug$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'pug-loader',
						options: {
							pretty: true
						}
					},
				]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
		...htmlPluginConfig,
	],
	devServer: {
		open: true, // サーバー起動時に自動的にブラウザを開く
		openPage: "index.html", //サーバー起動時に開くページ
		contentBase: path.join(__dirname, 'src'),// HTML等コンテンツのルートディレクトリ
		watchContentBase: true,//コンテンツの変更監視をする
		contentBase: dist, // HTML等コンテンツのルートディレクトリ
		port: 3000, // ポート番号
	}
};