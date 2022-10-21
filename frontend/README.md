# Todo App - Frontend

## Configuração e Instalação

### Criação do arquivo package.json

- Para começar devemos criar o arquivo `package.json`, o qual vai conter as nossas dependências cadastradas e scripts que iremos executar para startar a aplicação. 
E para criar esse arquivo vamos rodar o comando seguinte no terminal:

```
npm init -y
```

**Obs.:** 
`-y` - É para responder todas as perguntas dessa inicialização de forma padrão.

### Declaração das dependências

- Para isso, vamos rodar o comando seguinte no terminal:

```
npm i --save-dev
```

**Obs.:** 
`i` - Abreviação para `install`;
`--save` - Vai adicionar no projeto e além disso fica padrão para todos seus projetos em node no arquivo package.json. A função do `--save` era adicionar a dependência ao package.json, mas a partir da `versão 5` do npm essa opção não é mais necessária pois é executada por `padrão` (http://blog.npmjs.org/post/161081169345/v500);
`-dev` - Para instalar as dependências informadas apenas no ambiente de desenvolvimento.

- Seguido dos nomes das dependências e suas versões que queremos instalar na aplicação:

```
npm i --save-dev webpack@1.14.0 webpack-dev-server@1.16.2 

npm i --save-dev babel-core@6.22.1 babel-loader@6.2.10 babel-plugin-react-html-attrs@2.0.0 babel-plugin-transform-object-rest-spread@6.22.0 babel-preset-es2015@6.22.0 babel-preset-react@6.22.0

npm i --save-dev extract-text-webpack-plugin@1.0.1 css-loader@0.26.1 style-loader@0.13.1 file-loader@0.9.0

npm i --save-dev bootstrap@3.3.7 font-awesome@4.7.0

npm i --save-dev react@15.4.2 react-dom@15.4.2 react-router@3.0.2 axios@0.15.3
```

**Obs.:** 
`webpack` - Primeiro pacote que iremos instalar será o webpack, ele é um empacotador de módulos gratuito e de código aberto para JavaScript. Ele é feito principalmente para JavaScript, mas pode transformar ativos de front-end, como HTML, CSS e imagens, se os carregadores correspondentes forem incluídos;
`babel` - O browser não consegue interpretar os códigos, sintaxe do React(JSX, TSX) de forma nativa, portanto o babel faz esse trabalho de conversão;
`extract-text-webpack-plugin` - Plugin que irá extrair os textos dos arquivos CSS para depois passar por um processamento com o `css-loader` e o `style-loader`;
`bootstrap` - Framework de estilização.

### Configurando o Build com Webpack

- Com o projeto aberto editor de texto, vamos criar o arquivo `webpack.config.js` na raiz do projeto.

#### Configurações no arquivo webpack.config.js

- Inicialmente iremos fazer um `require` do `webpack` e armazenar essa referência na const `webpack`:

``` JS
// padrão commonjs
const webpack = require("webpack");
```

- O mesmo iremos fazer com a dependência `extract-text-webpack-plugin`:

``` JS
// padrão commonjs
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
```

- Agora, vamos exportar esse módulo para que fique visível/acessível externamente chamando o `module.exports` o qual irá receber o que queremos exportar/expor, que nesse caso é o objeto que vai conter toda a configuração que iremos precisar para o projeto:

``` JS
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
```

### Alterações no arquivo package.json

- No objeto `scripts` vamos apagar o que existe dentro dele, e em seguida iremos inserir dois scripts, o `dev` o qual irá chamar o `webpack-dev-server` e o outro `production` o qual irá chamar o `webpack`:

``` JSON
{
  "name": "frontend",
  "version": "1.0.0",
  "description": "## Configuração e Instalação",
  "main": "index.js",
  "scripts": {
    "dev": "webpack-dev-server --progress --colors --inline --hot",
    "production": "webpack --progress -p"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "axios": "^0.15.3",
    "babel-core": "^6.22.1",
    "babel-loader": "^6.2.10",
    "babel-plugin-react-html-attrs": "^2.0.0",
    "babel-plugin-transform-object-rest-spread": "^6.22.0",
    "babel-preset-es2015": "^6.22.0",
    "babel-preset-react": "^6.22.0",
    "bootstrap": "^3.3.7",
    "css-loader": "^0.26.1",
    "extract-text-webpack-plugin": "^1.0.1",
    "file-loader": "^0.9.0",
    "font-awesome": "^4.7.0",
    "react": "^15.4.2",
    "react-dom": "^15.4.2",
    "react-router": "^3.0.2",
    "style-loader": "^0.13.1",
    "webpack": "^1.14.0",
    "webpack-dev-server": "^1.16.2"
  }
}
```

### Criação do index.html

- Na raiz do projeto iremos criar uma pasta chamada `public` e dentro dessa pasta iremos criar o arquivo `index.html`.

#### Estrutura do arquivo index.html

``` HTML
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo APP</title>
  <link rel="stylesheet" href="app.css">
</head>
<body>
  <div id="app" class="container"></div>
  <script src="app.js"></script>
</body>
</html>
```