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

## Criação do index.html

- Na raiz do projeto iremos criar uma pasta chamada `public` e dentro dessa pasta iremos criar o arquivo `index.html`.

### Estrutura do arquivo index.html

- No arquivo `index.html` iremos criar uma extrutura html básica. Nele iremos criar uma `div`(com id app) na qual os componentes serão injetados mais a frente(através do arquivo `index.jsx` que irá injetar o componente principal `App.jsx` que irá conter todos os demais componentes da aplicação):

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

## Criação do Componente App

- Na raiz do projeto, vamos criar a pasta `src` e dentro dela a pasta `main`; dentro da pasta main vamos criar o arquivo `app.jsx`.

### Estrutura do arquivo App.jsx

- O componente App será um componente baseado em função:

``` JSX
// import - export -> padrão ecmascript 2011(ES6)
// require -> padrão CommonJS (a maneira que o Node.js criou para importar e exportar modulos dentro de uma aplicação)
// webpack suporta os dois formatos, mas como estamos trabalhando com react(js) iremos usar o import - export para padronizar
import "modules/bootstrap/dist/css/bootstrap.min.css";
import "modules/font-awesome/css/font-awesome.min.css"; // modules - apelido definido dentro de webpack.config para o diretório node_modules

import React from "react"; // importarmos o React para usarmos o jsx

function App(props) {
  return (
    <div className="container">
      <h1>Teste</h1>
    </div>
  )
}

export default App;
```

## Criação do arquivo de entrada(entry) da aplicação: index.jsx

- Na pasta `src` vamos criar o arquivo `index.jsx`.

### Estrutura do arquivo index.jsx

- No arquivo `index.jsx` além de importarmos o `React` para usarmos o jsx, iremos importar o `ReactDOM`, pois esse é o único arquivo que vai interagir diretamente com o DOM da página:

``` JSX
import React from "react";
import ReactDOM  from "react-dom";
```

- Em seguida, iremos importar o componente principal da aplicação(`App.jsx`):

``` JSX
import React from "react";
import ReactDOM  from "react-dom";
import App from "./main/App";
```

- Para finalizar, iremos chamar a função `render` do `ReactDOM`, passando dois parâmetros, o primeiro é a referência do componente principal(`<App />`) e o segundo é o local do documento html onde esse componente vai ser injetado/renderizado(`document.getElementById("app")`):

``` JSX
import React from "react";
import ReactDOM  from "react-dom";
import App from "./main/App";

ReactDOM.render(<App />, document.getElementById("app"));
```

## Criação do Componente Todo

- Na raiz do projeto iremos criar uma pasta chamada `components` e dentro dela vamos criar uma pasta chamada `Todo`; dentro da pasta `Todo` o arquivo `Todo.jsx`.

### Estrutura do arquivo Todo.jsx

- O componente Todo será um componente baseado em classe, para facilitar o gerênciamento de estado:

``` JSX
import React, { Component } from "react";

class Todo extends Component {
  render() {
    return (
      <div>
        <h1>Todo</h1>
      </div>
    )
  }
}

export default Todo;
```

- Em seguida, para que aplicação passe a usar esse componente vamos no componente principal(App.jsx) e nele iremos importar o componente Todo:

``` JSX
import "modules/bootstrap/dist/css/bootstrap.min.css";
import "modules/font-awesome/css/font-awesome.min.css"; 

import React from "react";
import Todo from "../../components/Todo";

function App(props) {
  return (
    <div className="container">
      <Todo />
    </div>
  )
}

export default App;
```

## Criação do Componente About

- Dentro da pasta `components` vamos criar uma pasta chamada `About` e dentro dela iremos criar o arquivo `About.jsx`.

### Estrutura do arquivo About.jsx

- O componente About será um componente baseado em função:

``` JSX
import React from "react";

function About(props) {
  return (
    <div>
      <h1>About</h1>
    </div>
  )
}

export default About;
```

- Em seguida, para que aplicação passe a usar esse componente vamos no componente principal(App.jsx) e nele iremos importar o componente About:

``` JSX
import "modules/bootstrap/dist/css/bootstrap.min.css";
import "modules/font-awesome/css/font-awesome.min.css"; 

import React from "react";
import Todo from "../../components/Todo";
import About from "../../components/About";

function App(props) {
  return (
    <div className="container">
      <Todo />
      <About />
    </div>
  )
}

export default App;
```

## Criação do Componente Menu

- Dentro da pasta `components` vamos criar uma pasta chamada `Menu` e dentro dela iremos criar o arquivo `Menu.jsx`.

### Estrutura do arquivo Menu.jsx

- O componente Menu será um componente baseado em função, já aplicando alguns estilos do bootstrap:

``` JSX
import React from "react";

function Menu() {
  return (
    <nav className="navbar navbar-inverse bg-inverse">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
            <i className="fa fa-calendar-check-o">TodoApp</i>
          </a>
        </div>

        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li><a href="#/todos">Tarefas</a></li>
            <li><a href="#/about">Sobre</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Menu;
```

- Em seguida, para que aplicação passe a usar esse componente vamos no componente principal(App.jsx) e nele iremos importar o componente Menu:

``` JSX
import "modules/bootstrap/dist/css/bootstrap.min.css";
import "modules/font-awesome/css/font-awesome.min.css";

import React from "react";
import Todo from "../../components/Todo";
import About from "../../components/About";
import Menu from "../../components/Menu";

function App(props) {
  return (
    <div className="container">
      <Menu />
      <Todo />
      <About />
    </div>
  )
}

export default App;
```

## Configuração das Rotas com React Router

- Dentro da pasta `main` iremos criar o arquivo `Routes.jsx`.

### Estrutura do arquivo Routes.jsx

- O componente Routes será um componente baseado em função:

``` JSX
import React from "react";
// Na nova versão do do react-router ocorreram algumas alterações bem significativas em seus componentes. Vale ler a documentação quando for usá-la(https://reactrouter.com).
// Com o nextJS não precisamos configurar as rotas com manualmente com o react-router ele já trás isso configurado, basta criar os arquivos dentro pages que suas rotas seram configuradas automáticamente.
import { Router, Route, Redirect, hashHistory } from "react-router";

import Todo from "../../components/Todo";
import About from "../../components/About";

function Routes(props) {
  return (
    <Router history={hashHistory}>
      <Route path="/todos" component={Todo} />
      <Route path="/about" component={About} />
      <Redirect from="*" to="/todos" />
    </Router>
  )
}

export default Routes;
```

- Em seguida, para que aplicação passe a usar esse componente vamos no componente principal(App.jsx) e nele iremos importar o componente Routes:

``` JSX
// import - export -> padrão ecmascript 2011(ES6)
// require -> padrão CommonJS (a maneira que o Node.js criou para importar e exportar modulos dentro de uma aplicação)
// webpack suporta os dois formatos, mas como estamos trabalhando com react(js) iremos usar o import - export para padronizar
import "modules/bootstrap/dist/css/bootstrap.min.css";
import "modules/font-awesome/css/font-awesome.min.css"; // modules - apelido definido dentro de webpack.config para o diretório node_modules

import React from "react";
// import Todo from "../../components/Todo";
// import About from "../../components/About";
import Menu from "../../components/Menu";
import Routes from "./Routes";

function App(props) {
  return (
    <div className="container">
      <Menu />
      {/* <Todo />
      <About /> */}
      <Routes />
    </div>
  )
}

export default App;
```

## Criação do Componente PageHeader

- Dentro da pasta `components` vamos criar uma pasta chamada `PageHeader` e dentro dela iremos criar o arquivo `PageHeader.jsx`.

### Estrutura do arquivo PageHeader.jsx

- O componente PageHeader será um componente baseado em função, já aplicando alguns estilos do bootstrap:

``` JSX
import React from "react";

function PageHeader(props) {
  return (
    <header className="page-header">
      <h2>{props.name} <small>{props.small}</small></h2> {/*Vamos esperar receber via props no componente principal name e small*/}
    </header>
  )
}

export default PageHeader;
```

- Em seguida, para que aplicação passe a usar esse componente, vamos no componente `Todo` e nele iremos importar o componente PageHeader passando as `props` esperadas:

``` JSX
import React, { Component } from "react";

import PageHeader from "../PageHeader";

class Todo extends Component {
  render() {
    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro" />
      </div>
    )
  }
}

export default Todo;
```

- E também vamos no componente `About` e nele iremos importar o componente PageHeader passando as `props` esperadas:

``` JSX
import React from "react";

import PageHeader from "../PageHeader";

function About(props) {
  return (
    <div>
      <PageHeader name="Sobre" small="Nós" />

      <h2>Nossa história</h2>
      <p>Minions ipsum uuuhhh hahaha baboiii uuuhhh gelatooo daa belloo!</p>
      <h2>Missão e Visão</h2>
      <p>Minions ipsum uuuhhh hahaha baboiii uuuhhh gelatooo daa belloo!</p>
      <h2>Imprensa</h2>
      <p>Minions ipsum uuuhhh hahaha baboiii uuuhhh gelatooo daa belloo!</p>
    </div>
  )
}

export default About;
```

## Criação do Componente TodoForm

- Dentro da pasta `components` vamos criar uma pasta chamada `TodoForm` e dentro dela iremos criar o arquivo `TodoForm.jsx`.

### Estrutura do arquivo TodoForm.jsx

- O componente TodoForm será um componente baseado em função, já aplicando alguns estilos do bootstrap:

``` JSX
import React from "react";

function TodoForm(props) {
  return (
    <div role="form" className="todoForm">
      <div className="col-xs-12 col-sm-9 col-md-10">
        <input type="text" id="description" className="form-control" 
          placeholder="Adicione uma tarefa" />
      </div>

      <div className="col-xs-12 col-sm-3 col-md-2">
        <button className="btn btn-primary">
          <i className="fa fa-plus"></i>
        </button>
      </div>
    </div>
  )
}

export default TodoForm;
```

- Em seguida, para que aplicação passe a usar esse componente, vamos no componente `Todo` e nele iremos importar o componente TodoForm:

``` JSX
import React, { Component } from "react";

import PageHeader from "../PageHeader";
import TodoForm from "../TodoForm/TodoForm";

class Todo extends Component {
  render() {
    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro" />
        <TodoForm />
      </div>
    )
  }
}

export default Todo;
```

## Criação do Componente TodoList

- Dentro da pasta `components` vamos criar uma pasta chamada `TodoList` e dentro dela iremos criar o arquivo `TodoList.jsx`.

### Estrutura do arquivo TodoList.jsx

- O componente TodoList será um componente baseado em função:

``` JSX
import React from "react";

function TodoList(props) {
  return (
    <div>
      <h1>List</h1>
    </div>
  )
}

export default TodoList;
```

- Em seguida, para que aplicação passe a usar esse componente, vamos no componente `Todo` e nele iremos importar o componente TodoList:

``` JSX
import React, { Component } from "react";

import PageHeader from "../PageHeader";
import TodoForm from "../TodoForm";
import TodoList from "../TodoList";

class Todo extends Component {
  render() {
    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro" />
        <TodoForm />
        <TodoList />
      </div>
    )
  }
}

export default Todo;
```

## Criação do Componente Grid

- Dentro da pasta `components` vamos criar uma pasta chamada `Grid` e dentro dela iremos criar o arquivo `Grid.jsx`.

### Estrutura do arquivo Grid.jsx

- O componente Grid será um componente baseado em classe, nele iremos passar uma lista de números(até 4) e converte-los no padrãos de 4 colunas do bootstrap(`col-` `xs`[extra small ex.: celular], `sm`[small ex.: tablets], `md`[medium ex.: ipad surface] `lg`[large ex.: desktop]) través da função `toCssClasses`:

``` JSX
import React, { Component } from "react";

class Grid extends Component {

  toCssClasses(numbers) {
    const cols = numbers ? numbers.split(" ") : []; // numbers existe ? se verdadeiro aplicar o método split no array numbers, senão : retornar um array vazio 
    let classes = "";

    if(cols[0]) classes += `col-xs-${cols[0]}`;
    if(cols[1]) classes += ` col-sm-${cols[1]}`;
    if(cols[2]) classes += ` col-md-${cols[2]}`;
    if(cols[3]) classes += ` col-lg-${cols[3]}`;

    return classes;
  }

  render() {
    const gridClasses = this.toCssClasses(this.props.cols || 12); // se cols não foi setado cols será 12

    console.log(gridClasses);
    console.log(this.props.cols);
    console.log(this.props);

    return (
      <div className={gridClasses}>
        {this.props.children}
      </div>
    )
  }
}

export default Grid;
```

- Feito isso, podemos voltar no componente `TodoForm`, importar o componente Grid e substituir divs com as definições das classes bootstrap para colunas pela referência do componente `Grid` passando via props o tamanho das colunas:

``` JSX
import React from "react";

import Grid from "../Grid";

function TodoForm(props) {
  return (
    <div role="form" className="todoForm">
      <Grid cols="12 9 10">
        <input type="text" id="description" className="form-control" 
          placeholder="Adicione uma tarefa" />
      </Grid>
        

      <Grid cols="12 3 2">
        <button className="btn btn-primary">
          <i className="fa fa-plus"></i>
        </button>
      </Grid>
    </div>
  )
}

export default TodoForm;
```

## Criação do Componente Grid

- Dentro da pasta `components` vamos criar uma pasta chamada `Button` e dentro dela iremos criar o arquivo `Button.jsx`.

### Estrutura do arquivo Grid.jsx

- O componente Button será um componente baseado em função, nele iremos esperar receber via props o estilo/`style`, a função `onClick` e o ícone/`icon` do botão:

``` JSX
import React from "react";

function Button(props) {

  const style = props.style ? props.style : "secondary";
  const icon = props.icon ? props.icon : "heart";

  return (
    <button className={`btn btn-${style}`} onClick={props.onClick}>
      <i className={`fa fa-${icon}`}></i>
    </button>
  )
}

export default Button;
```

- Feito isso, podemos voltar no componente `TodoForm`, importar o componente Button e substitui o button com as definições das classes bootstrap para `button` e `i` pela referência do componente `Button` passando via props o style e o icon:

``` JSX
import React from "react";

import Grid from "../Grid";
import Button from "../Button";

function TodoForm(props) {
  return (
    <div role="form" className="todoForm">
      <Grid cols="12 9 10">
        <input type="text" id="description" className="form-control" 
          placeholder="Adicione uma tarefa" />
      </Grid>
        
      <Grid cols="12 3 2">
        <Button style="primary" icon="plus" />
      </Grid>
    </div>
  )
}

export default TodoForm;
```

## Evento adicionar/add tarefa

- Voltaremos no arquivo `TodoForm.jsx`.

### Alterações no arquivo TododForm.jsx 

- Iremos passar para a propriedade `onClick` do `Button` uma função e essa função iremos receber via `props` do componente pai(componente pai de `TodoForm` é o `Todo`) essa função será passada pelo atributo chamado `handleAdd`(a função irá manipular o evento de adicionar uma tarefa):

``` JSX
import React from "react";

import Grid from "../Grid";
import Button from "../Button";

function TodoForm(props) {
  return (
    <div role="form" className="todoForm">
      <Grid cols="12 9 10">
        <input type="text" id="description" className="form-control" 
          placeholder="Adicione uma tarefa" />
      </Grid>
        
      <Grid cols="12 3 2">
        <Button style="primary" icon="plus" onClick={props.handleAdd} />
      </Grid>
    </div>
  )
}

export default TodoForm;
```

- Feito isso, iremos para o arquivo `Todo.jsx`.

### Aterações no arquivo Todo.jsx 

- Nesse componente iremos criar o método(função) `handleAdd()` que iremos passar via props para o componente `TodoForm` através do atributo `handleAdd`(e o componente TodoForm irá passar essa função para o evento onClick do componente Button, via props);
E criar um `constructor` para que `this.handleAdd` aponte para o objeto atual através do método `bind`:

``` JSX
import React, { Component } from "react";

import PageHeader from "../PageHeader";
import TodoForm from "../TodoForm";
import TodoList from "../TodoList";

class Todo extends Component {

  constructor(props) {
    // com o construtor, idenpendente de quem irá chamar, o this irá apontar para a própria classe, nesse caso é Todo
    super(props);
    this.handleAdd = this.handleAdd.bind(this); 
  }

  handleAdd() {
    // console.log(this); // => null - para resolver isso iremos criar um construtor
  }

  render() {
    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro" />
        <TodoForm handleAdd={this.handleAdd} />
        <TodoList />
      </div>
    )
  }
}

export default Todo;
```

## Evento onChange do input

- Voltaremos no arquivo `TodoForm.jsx`.

### Alterações no arquivo TodoForm.jsx

- No `input` vamos adicionar um `value` o qual iremos receber via props do componente pai(Todo) dentro do atributo `description`; 
E um evento `onChange` no qual iremos passar uma função que iremos receber via props do componente pai(Todo) dentro do atributo `handleChange`:

``` JSX
import React from "react";

import Grid from "../Grid";
import Button from "../Button";

function TodoForm(props) {
  return (
    <div role="form" className="todoForm">
      <Grid cols="12 9 10">
        <input type="text" id="description" className="form-control" 
          placeholder="Adicione uma tarefa" onChange={props.handleChange} 
          value={props.description} />
      </Grid>
        
      <Grid cols="12 3 2">
        <Button style="primary" icon="plus" onClick={props.handleAdd}></Button>
      </Grid>
    </div>
  )
}

export default TodoForm;
```

- Feito isso, iremos para o arquivo `Todo.jsx`.

### Alterações no arquivo Todo.jsx

- Dentro do `constructor` vamos definir o estado inicial/`state` do objeto/classe Todo:

``` JSX
import React, { Component } from "react";

import PageHeader from "../PageHeader";
import TodoForm from "../TodoForm";
import TodoList from "../TodoList";

class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = { description: "", list: [] };

    this.handleAdd = this.handleAdd.bind(this); 
  }

  handleAdd() {

  }

  render() {
    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro" />
        <TodoForm handleAdd={this.handleAdd} />
        <TodoList />
      </div>
    )
  }
}

export default Todo;
```

- Em seguida, iremos criar o método(função) `handleChange(e)` que iremos passar via props para o componente `TodoForm` através do atributo `handleChange` para o evento `onChange` do `input`;
E no `constructor` iremos aplicar o método `bind` para que `this.handleChange` aponte para o objeto atual:

``` JSX
import React, { Component } from "react";

import PageHeader from "../PageHeader";
import TodoForm from "../TodoForm";
import TodoList from "../TodoList";

class Todo extends Component {

  constructor(props) {
    // com o construtor, idenpendente de quem irá chamar, o this irá apontar para a própria classe, nesse caso é Todo
    super(props);
    this.state = { description: "", list: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this); 
  }

  handleChange(e) {
    this.setState({ ...this.state, description: e.target.value }); // iremos pegar com o operador spreed o estado atual, e passar somente para o description o valor capturado no evento
  }

  handleAdd() {
    console.log(this.state.description);
  }

  render() {
    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro" />
        <TodoForm description={this.state.description} 
          handleChange={this.handleChange}
          handleAdd={this.handleAdd} />
        <TodoList />
      </div>
    )
  }
}

export default Todo;
```

## Evento adicionar/add tarefa(integração com backend)

- No arquivo `Todo.jsx`.

### Alterações no arquivo Todo.jsx

- Primeiramente, vamos importar o `axios`, em seguida iremos criar uma const que irá receber a URL base da API no backend:

``` JSX
import React, { Component } from "react";
import axios from "axios";

import PageHeader from "../PageHeader";
import TodoForm from "../TodoForm";
import TodoList from "../TodoList";

const URL = "http://localhost:3003/api/todos";

class Todo extends Component {
  // [...]
}

export default Todo;
```

- Em seguida, no método `handleAdd` iremos fazer o envio através do método `post` das novas tarefas adicionadas:

``` JSX
import React, { Component } from "react";
import axios from "axios";

import PageHeader from "../PageHeader";
import TodoForm from "../TodoForm";
import TodoList from "../TodoList";

const URL = "http://localhost:3003/api/todos";

class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = { description: "", list: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this); 
  }

  handleChange(e) {
    this.setState({ ...this.state, description: e.target.value }); 
  }

  handleAdd() {
    const description = this.state.description;
    axios.post(URL, { description })
      .then(resp => console.log("Funcionou"));
  }

  render() {
    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro" />
        <TodoForm description={this.state.description} 
        handleChange={this.handleChange}
        handleAdd={this.handleAdd} />
        <TodoList />
      </div>
    )
  }
}

export default Todo;
```

## Consulta e Exclusão de Todo's

- No arquivo `Todo.jsx`.

### Alterações no arquivo Todo.jsx

- Iremos criar um método `refesh` que irá pegar a lista mais atualizada de tarefas ordená-las pela dada de criação:

``` JSX
import React, { Component } from "react";
import axios from "axios";

import PageHeader from "../PageHeader";
import TodoForm from "../TodoForm";
import TodoList from "../TodoList";

const URL = "http://localhost:3003/api/todos";

class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = { description: "", list: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this); 

    this.refresh();
  }

  refresh() { 
    axios.get(`${URL}?sort=-createdAt`)
      .then(resp => this.setState({...this.state, description: "", list: resp.data}));
  }

  handleChange(e) {
    this.setState({ ...this.state, description: e.target.value }); 
  }

  handleAdd() {
    const description = this.state.description;
    axios.post(URL, { description })
      .then(resp => console.log("Funcionou"));
  }

  render() {
    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro" />
        <TodoForm description={this.state.description} 
        handleChange={this.handleChange}
        handleAdd={this.handleAdd} />
        <TodoList />
      </div>
    )
  }
}

export default Todo;
```

- Iremos também fazer uma alteração no método `handleAdd`, ao invés de exibir um console quando for concluída a adição da tarefa iremos chamar o método `refresh` para que sempre que uma nova tarefa for adicionada seja exibida a lista de tarefas atualização(já com o novo item):

``` JSX
import React, { Component } from "react";
import axios from "axios";

import PageHeader from "../PageHeader";
import TodoForm from "../TodoForm";
import TodoList from "../TodoList";

const URL = "http://localhost:3003/api/todos";

class Todo extends Component {

  constructor(props) {
    // o construtor é executado assim que a página é carregada
    super(props);
    this.state = { description: "", list: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this); 

    this.refresh();
  }

  refresh() { 
    axios.get(`${URL}?sort=-createdAt`)
      .then(resp => this.setState({...this.state, description: "", list: resp.data}));
  }

  handleChange(e) {
    this.setState({ ...this.state, description: e.target.value }); 
  }

  handleAdd() {
    const description = this.state.description;
    axios.post(URL, { description })
      .then(resp => this.refresh());
  }

  render() {
    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro" />
        <TodoForm description={this.state.description} 
        handleChange={this.handleChange}
        handleAdd={this.handleAdd} />
        <TodoList />
      </div>
    )
  }
}

export default Todo;
```

### Alterações no arquivo TodoList.jsx

- Para que essas alterações reflitam em tela, iremos voltar no componente TodoList e nele vamos criar uma tabela com aplicação de estilos do bootstrap; 
Essa tabela irá interar o array de objetos `list` que esperamos receber via props; 
Além disso o `Button` de excluir de cada item/`todo` no evento de no atributo onClick(que envia para o evento onClick do elemento button) espera receber via props a função `handleRemove`:

``` JSX
import React from "react";
import Button from "../Button";

function TodoList(props) {

  console.log(props);

  const renderRows = () => {
    const list = props.list ? props.list : []; // se props.list existir list recebe props.list senão um array vazio

    return list.map(todo => (
      // _id gerado pelo próprio mongo
      <tr key={todo._id}> 
        <td>{todo.description}</td>
        <td>
          <Button style="danger" icon="trash-o" 
            onClick={() => props.handleRemove(todo)} /> 
        </td>
      </tr>
    ));
  }

  console.log("render", renderRows())
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        {renderRows()}
      </tbody>
    </table>
  )
}

export default TodoList;
```

### Alterações no arquivo Todo.jsx

- Feito isso, iremos voltar no arquivo `Todo.jsx` e passar via props a lista/`list` e a função `handleRemove()` que o componente `TodoList` espera receber para renderizar na tabela:

``` JSX
import React, { Component } from "react";
import axios from "axios";

import PageHeader from "../PageHeader";
import TodoForm from "../TodoForm";
import TodoList from "../TodoList";

const URL = "http://localhost:3003/api/todos";

class Todo extends Component {

  constructor(props) {
    // o construtor é executado assim que a página é carregada
    // com o construtor, idenpendente de quem irá chamar, o this irá apontar para a própria classe, nesse caso é Todo
    super(props);
    this.state = { description: "", list: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this); 

    this.refresh();
  }

  refresh() { 
    axios.get(`${URL}?sort=-createdAt`)
      .then(resp => this.setState({...this.state, description: "", list: resp.data}));
  }

  handleChange(e) {
    this.setState({ ...this.state, description: e.target.value }); 
  }

  handleAdd() {
    const description = this.state.description;
    axios.post(URL, { description })
      .then(resp => this.refresh());
  }


  handleRemove(todo) {
    axios.delete(`${URL}/${todo._id}`)
      .then(resp => this.refresh());
  }

  render() {
    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro" />
        <TodoForm description={this.state.description} 
        handleChange={this.handleChange}
        handleAdd={this.handleAdd} />
        <TodoList list={this.state.list} handleRemove={this.handleRemove} />
      </div>
    )
  }
}

export default Todo;
```