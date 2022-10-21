// padrão commonjs
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx", // entrada
  output: { // saída
    path: __dirname + "/public", // diretório ; __dirname variável de ambiente do nodejs que informa o caminho absoluto do diretório que contém o arquivo em execução no momento.
    filename: "./app.js" // nome do arquivo
  },
  devServer: { // config. server amb. desenvolvimento
    port: 8080, // porta que irá rodar
    contentBase: "./public"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"], // extensões que ele irá precisar reconhecer
    alias: { // apelidos
      modules: __dirname + "/node_modules", // apelido para a referência ao caminho da pasta node_modules
    }
  },
  plugins: [
    new ExtractTextPlugin("app.css"), // criação de uma nova instância do extract-text-webpack-plugin passando o nome do arquivo que ele irá gerar apartir dos parsers que ele irá fazer em cima do css
  ],
  module: { // configuração de módulos
    loaders: [{
      test: /.js[x]?$/, // expressão regular para idenficar nome dos arquivos que contém .js ou .jsx(x é opcional)
      loader: "babel-loader",
      exclude: /node_modules/,
      query: {
        presets: ["es2015", "react"],
        plugins: ["transform-object-rest-spread"]
      }
    }, 
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }, 
    {
      test: /\.woff|.woff2|.ttf|.eot|.svg*.*$/,
      loader: "file"
    }]
  }
};