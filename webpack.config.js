module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",
  //   devtool: "source-map",

  // メインとなるJavaScriptファイル（エントリーポイント）
  // polyfill はIE11などで必要
  entry: ["@babel/polyfill", "./src/index.js"],

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist/js`,
    // 出力ファイル名
    filename: "main.js"
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // Babel を利用する
          loader: "babel-loader",
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  'targets': '> 0.25%, not dead',
                  'corejs': 3
                }
              ]
            ]
          }
        }
      }
    ]
  }
};
