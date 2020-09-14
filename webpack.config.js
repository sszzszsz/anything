const path = require('path')
// ワイルドカードでファイルを探してきてくれる
const globule = require('globule')
// CSSを別ファイルにするプラグイン
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// CSSをバンドルするときに出力される空のJSをなくすプラグイン
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
// pugに変数を渡すプラウグイン
const HtmlWebpackPlugin = require('html-webpack-plugin')
// JSからコメントやconsoleを削除する
const TerserPlugin = require('terser-webpack-plugin')

// 公開フォルダ・作業フォルダのディレクトリ指定
const dir = {
  src: path.join(__dirname, 'src'),
  public: path.join(__dirname, 'dist')
}

// development:開発
// production:本番
// const mode = 実行時のnpm scriptで制御

const config = {
  entry: {
    // webpackがビルドを始める際の開始点となるjsファイル
    js: path.join(__dirname, 'src/js/main.js'),
    css: path.join(__dirname, 'src/scss/style.scss')
  },

  output: {
    // bundleファイルをwebpackがどこにどのような名前で出力すればいいのかを指定
    filename: 'assets/js/[name]_bundle.js',
    path: dir.public
  },

  module: {
    rules: [
      {
        // ESlint
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|public)/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        // jsのコンパイル
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: 'babel-loader',
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2020 を ES5 に変換
                '@babel/preset-env'
              ]
            }
          }
        ]
      },
      {
        // scssのコンパイル
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { // css内のurl()メソッドや@import文をJavaScriptのrequire()メソッドに変換。
            // file-loaderやurl-loaderと組み合わせて依存解決
            loader: 'css-loader',
            options: { url: true } // ファイルパスの解決
          },
          {
            loader: 'postcss-loader',
            options: { plugins: [require('autoprefixer')] }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        // pugのコンパイル
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
              root: path.join(__dirname, 'src/pug')
            }
          }
        ]
      },
      {
        // 画像を埋め込まず任意のフォルダに保存する
        test: /\.(gif|png|jpg|jpeg|eot|wof|woff|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/img/',
              publicPath: function (path) {
                return '/assets/img/' + path
              }
              // publicPath: '/assets/img/'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/style.css'
    }),
    new FixStyleOnlyEntriesPlugin(),
    new HtmlWebpackPlugin({
      // eslint-disable-next-line quotes
      filename: `index.html`,
      template: './src/pug/index.pug',
      title: '',
      data: require('./data.json')
    })
  ],

  // webpack-dev-server用設定
  devServer: {
    open: true, // ブラウザを自動で開く
    openPage: 'index.html', // 自動で指定したページを開く
    contentBase: path.join(__dirname, 'dist'), // HTML等コンテンツのルートディレクトリ
    watchContentBase: true, // コンテンツの変更監視をする
    port: 3000 // ポート番号
  },

  // productionモードで有効になるoptimization.minimizerを上書きする
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          extractComments: 'all',
          compress: { drop_console: true }
        }
      })
    ]
  }
}

// pugファイルの設定
const documents = globule.find('./src/pug/**/*.pug', {
  ignore: ['./src/pug/**/_*.pug']
})

documents.forEach((document) => {
  const fileName = document.replace('./src/pug/', '').replace('.pug', '.html')
  console.log('fileName', fileName)
  console.log('document', document)
  const json = require('./data.json')

  Object.keys(json).forEach(function (key) {
    if ('/' + fileName === json[key].root_path) {
      console.log('/' + fileName, json[key].root_path)

      config.plugins.push(
        new HtmlWebpackPlugin({
          filename: `${fileName}`,
          template: document,
          title: json[key].page_title,
          description: json[key].description,
          pageURL: json[key].local_path,
          ogpImg: json[key].ogpImg,
          pageKey: json[key].pageKey,
          data: json[key]
        })
      )
      console.log('ページtitle：', json[key].page_title)
      console.log('description：', json[key].description)
      console.log('root_path：', json[key].root_path)
      console.log('ドメイン＋', json[key].local_path)
      console.log('data：', json[key])
    }
  })
})

module.exports = config
