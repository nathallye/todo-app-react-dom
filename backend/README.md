# Todo App - Backend

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
npm i --save -E
```

**Obs.:** 
`i` - Abreviação para `install`;
`--save` -  Vamos usá-lo, porque as dependências da aplicação backend elas serão necessárias tanto no ambiente de desenvolvimento, quanto no ambiente de produção, o backend é totalmente dependente do node e ele espera que exista a pasta node_modules com todas as dependências instaladas.
Diferente do frontend onde as dependências são necessároas apenas no ambiente de desenvolvimento, porque o build vai ser responsável por gerar dois arquivos e esses arquivos conteram a aplicação sem ter a necessidade do node instalado e a pasta node_modules configurada dentro do servidor;
`-E` - Flag para instalar a versão exata informada.

- Seguido dos nomes das dependências e suas versões que queremos instalar na aplicação:

```
npm i --save -E body-parser@1.15.2 express@4.14.0 mongoose@4.7.0 node-restful@0.2.5 pm2@2.1.5
```

**Obs.:** 
`body-parser` - Primeiro pacote que iremos instalar será o `body-parser` ele será responsável por fazer a analise do corpo da requisição. Quando a requisição chega ela vem no formato string, por exemplo, os parâmetros da requisição e dentro desse parâmetros da requisição vem um objeto no formato JSON, então o `body-parser` vai ser responsável por ler esses parâmetros e converter para um objeto em JS para sejam acessados. Além do JSON, ele também será importante para fazer parser/analise quando vier os dados de um formulário;
`express` - Framework web que iremos trabalhar no backend;
`mongoose` - Biblioteca responsável por acessar o banco de dados;
`node-restful` - Para que nossa API seja feita de uma forma mais simples e otimizada, vamos utilizar essa dependência;
`pm2` - Responsável por iniciar nossa aplicação.

- Concluído as instalações das dependências, vamos rodar o comando a seguir:

```
npm i --save-dev -E
```

**Obs.:** 
`--save-dev` - Para instalar as dependências informadas apenas no ambiente de desenvolvimento.

- Seguido dos nomes das dependências e suas versões que queremos instalar na aplicação:

```
npm i --save-dev -E nodemon@1.11.0
```

`nodemon` - Responsável por iniciar nossa aplicação no ambiente de desenvolvimento.

### Alterações iniciais no projeto

- Com o projeto aberto editor de texto.

#### Alterações no arquivo package.json

- Em `main` vamos alterar o arquivo inicial para `src/loader.js`(ainda iremos criar esse arquivo):

``` JSON
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "src/loader.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "1.15.2",
    "express": "4.14.0",
    "mongoose": "4.7.0",
    "node-restful": "0.2.5",
    "pm2": "2.1.5"
  },
  "devDependencies": {
    "nodemon": "1.11.0"
  }
}
```

- No objeto `scripts` vamos apagar o que existe dentro dele, e em seguida iremos inserir dois scripts, o `dev` o qual irá chamar o `nodemon` e o outro `production` o qual irá chamar o `pm2`(pm2 start src/loader.js --name todo-app):

``` JSON
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "src/loader.js",
  "scripts": {
    "dev": "nodemon", // para startar a aplicação no ambiente dev
    "production": "pm2 start src/loader --name todo-app" // para startar a aplicação no ambiente production
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "1.15.2",
    "express": "4.14.0",
    "mongoose": "4.7.0",
    "node-restful": "0.2.5",
    "pm2": "2.1.5"
  },
  "devDependencies": {
    "nodemon": "1.11.0"
  }
}
```

### Alterações na pasta backend

- Dentro do diretório `backend` vamos criar um novo arquivo chamado `.gitignore` e nele iremos informar os diretórios e/ou arquivos que não queremos inviar para o repositório:

``` 
node_modules #repositório
*.log #arquivos que terminam com .log
```

## Configurando o Servidor com Express

- Primeiramente, na raiz do projeto vamos criar a pasta `src` e dentro dela a subpasta `config` e o arquivo `loader.js`(arquivo que irá os principais arquivos de configuração do projeto); dentro da pasta `config` vamos criar o arquvivo `server.js`(arquivo relativo ao Express onde iremos startar o servidor).

#### Configurações do arquivo loader.js

- O `loader.js` é o arquivo que irá os principais arquivos de configuração do projeto, por tanto, inicialmente dentro dele iremos fazer um `require` do arquivo `server.js`:

``` JS
require("./config/server");
```

#### Configurações do arquivo server.js

- Feito isso, no `server.js`, arquivo relativo ao Express onde iremos startar o servidor. Iremos criar uma const `port` que irá receber a porta que essa aplicação irá rodar:

``` JS
const port = 3003;
```

- Em seguida, iremos criar uma const `bodyParser` que irá requisitar/`require` a dependência `body-parser`, a qual irá fazer o "parser"/analisar o corpo da requisição:

``` JS
const port = 3003;

const bodyParser = require("body-parser");
```

- Feito isso, iremos criar uma const `express` que irá requisitar/`require` a dependência `express`, o servidor web que roda "em cima" do nodeJS:

``` JS
const port = 3003;

const bodyParser = require("body-parser");
const express = require("express");
```

- Agora, iremos criar uma const `server` a qual irá receber uma instância do `express`:

``` JS
const port = 3003;

const bodyParser = require("body-parser");
const express = require("express");
const server = express();
```

- Uma vez criada uma instância do `express` iremos aplicar alguns `middlewares`(software que fica entre um sistema operacional e os aplicativos executados nele. Funcionando essencialmente como uma camada de tradução) para a requisição.
O primeiro deles é o `body-parser` que está dentro da const `bodyParser` no qual iremos configurar que sempre que chegar uma requisição no padrão `urlencoded`(padrão usado para submissão de formulários) será habilitado o módulo `extended` que suporta mais tipos de dados do que o padrão do `urlencoded`:

``` JS
const port = 3003;

const bodyParser = require("body-parser");
const express = require("express");
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
```

- O próximo `middleware` será também será o `body-parser` que está dentro da const `bodyParser` no qual iremos configurar que sempre que chegar uma requisição ele irá fazer o "parse" para `json`:

``` JS
const port = 3003;

const bodyParser = require("body-parser");
const express = require("express");
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
```

- Continuando iremos informar ao servidor/`server` ficar escutando/`listen` a porta 3003 que está armazenada na const `port`. E para caso ele consiga realmente alorcar essa porta e ficar escutando ela vamos chamar uma função callback que irá exibir um console para identificarmos que deu tudo certo:

``` JS
const port = 3003;

const bodyParser = require("body-parser");
const express = require("express");
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.listen(port, function() {
  console.log(`BACKEND is running on port ${port}.`);
});
```

#### Startando a aplicação backend com Nodemon

- Agora, podemos startar a aplicação usando o `nodemon` indo no terminal e rodando o comando seguinte: 

```
npm run dev
```

## Conexão com o Banco de Dados

- Primeiramente, dentro da pasta `config` vamos criar um arquivo chamado `database.js`(arquivo responsável pela configuração da aplicação com o mongodb).

#### Configurações do arquivo database.js

- Nesse arquivo iremos criar uma const `mongoose` que irá requisitar/`require` a dependência `mongoose`, responsável pelo mapeamento dos objetos JS para os documentos que vão para o mongodb, como também por fazer a conexão com o mongo e mandar os comandos pra lá(inserção, atualização, exclusão...):

``` JS
const mongoose = require("mongoose");
```

- Feito isso, vamos fazer uma substituição a qual vamos informar que o mongoose(`mongoose.Promise`) vai usar a API de Promise do próprio nodeJS(`global.Promise`), só para removermos uma mensagem de advertência a qual alerta que a API de Promise do mongoose está depreciada:

``` JS
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
```

- Agora, vamos exportar esse módulo para que fique visível/acessível externamente chamando o `module.exports` o qual irá receber o que queremos exportar/expor, que nesse caso é o `mongoose` conectado a uri do BD:

``` JS
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

module.exports = mongoose.connect("mongodb://localhost/todo");
```

#### Configurações do arquivo loader.js

- O `loader.js` é o arquivo que irá os principais arquivos de configuração do projeto, por tanto, dentro dele também iremos fazer um `require` do arquivo `database.js`:

``` JS
require("./config/server");
require("./config/database");
```

#### Startando a aplicação backend com Nodemon e o Banco de Dados MongoDB

- Agora, podemos startar a aplicação usando o `nodemon` indo no terminal e rodando o comando seguinte: 

```
npm run dev
```

- Podemos notar no terminal que gerou o erro `[nodemon] app crashed - waiting for file changes before starting...`, isso ocorre porque ainda não estamos com o `mongodb` startado.
Para startar o `mongodb` em um novo terminal vamos rodar o comando seguinte:

```
mongod
```

- Agora, se formos no terminal que está rodando a aplicação com o nodemon e digitarmos `rs`, é feito um reload na aplicação e feito isso a aplicação passa a funcionar normalmente.

#### Atualizações NodeJS 

- Devido a atualização do NodeJS a `uri` no seguinte formato está dando erro:

``` JS
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

module.exports = mongoose.connect("mongodb://localhost:27017/todo", {
  // configurações para resolver os avisos/warning no terminal
  useNewUrlParser: true, 
  useUnifiedTopology: true
});
```

- Buscando mais informações na internet encontrei que substituindo o localhost por 0.0.0.0 volta a funcionar:

``` JS
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

module.exports = mongoose.connect("mongodb://0.0.0.0:27017/todo", {
  // configurações para resolver os avisos/warning no terminal
  useNewUrlParser: true, 
  useUnifiedTopology: true
});
```

## ODM e Criação da API REST

- Primeiramente, dentro da pasta `src` vamos criar uma nova pasta chamada `api`; dentro da pasta `api` vamos criar um outro diretório chamado `todo`; e dentro da pasta `todo` vamos criar um arquivo chamado `todo.js`(arquivo responsável pela mapeamento do objeto para o documento do mongo) e um arquivo chamado `todoService.js`.

### Configurações do arquivo todo.js

- Dentro desse arquivo também iremos usar a API do `mongoose` juntamente com a API do Node RestFul que vai trazer algumas facilidades:

``` JS
const restful = require("node-restful"); // link documentação https://www.npmjs.com/package/node-restful
const mongoose = restful.mongoose; // o node-restful cria como se fosse uma casca "em cima" do mongoose resutando em uma api rest quase pronta
```

- O mapeamento que iremos fazer a seguir, independente se iremos trabalhar com `node-restful` ou diretamente com o `mongoose` é feito praticamente a mesma coisa.
Primeiramente, iremos criar uma const `todoSchema` que irá receber uma nova instância do `mongoose.Schema`:

``` JS
const restful = require("node-restful");
const mongoose = restful.mongoose; 

const todoSchema = new mongoose.Schema({

});
```

- Esse "schema" irá receber um campo/`field` descrição/`description` do tipo/`type` String, obrigatório/`required`; um campo/`field` feito/`done` do tipo/`type` Boolean, obrigatório/`required` e com valor padrão `false`; um campo/`field` data de criação da atividade/`createdAt` do tipo/`type` Date e com valor padrão/`default` data atual/`Date.now`:

``` TSX
const restful = require("node-restful");
const mongoose = restful.mongoose; 

const todoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  done: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now }
});
```

- Feito isso, vamos exportar esse módulo para que fique visível/acessível externamente chamando o `module.exports` o qual irá receber o que queremos exportar/expor, que nesse caso é o `restful.model` informando o nome do modelo que nesse caso é `Todo` e o schema `todoSchema`:

``` JS
const restful = require("node-restful");
const mongoose = restful.mongoose; 

const todoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  done: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = restful.model("Todo", todoSchema);
```

### Configurações do arquivo todoService.js

- Nesse arquivo, iremos importar o schema do todo, para isso iremos fazer um `require` para o caminho relativo do arquivo `todo.js` armazenando na const `Todo`:

``` JS
const Todo = require("./todo");
```

- Feito isso, conseguimos usar o `Todo.methods` para habilitar os métodos que queremos na nossa API:

``` JS
const Todo = require("./todo");

Todo.methods(["get", "post", "put", "delete"]);
```

- Por padrão, o `update` não valida algumas coisas então iremos realizar algumas mudanças no `updateOptions`. Primeiro, quando atualizarmos determinado registro lá no mongoDB queremos que na resposta/`response` seja devolvido o registro atualizado(por padrão o mongo devolve o registro antigo, o que não faz muito sentido), para isso iremos usar o `new: true`.
E a segunda alteração é para as atualizações sejam validadas(por padrão o mongo não valida as atualizações, por exemplo, quando criarmos um registro o mongo irá aplicar as validações que definimos no `todoSchema`, porém ele não as aplica no update), para isso iremos usar o `runValidators: true`:

``` JS
const Todo = require("./todo");

Todo.methods(["get", "post", "put", "delete"]);
Todo.updateOptions({new: true, runValidators: true});
```

- Por fim, iremos exportar esse módulo para que fique visível/acessível externamente chamando o `module.exports` o qual irá receber o que queremos exportar/expor, que nesse caso é o `Todo` já com toda a parte da API Rest funcionando(o node-restful não só encapsula a parte relativa ao Express, que é criar os web servises, como também as chamadas para a API do mongodb):

``` JS
const Todo = require("./todo");

Todo.methods(["get", "post", "put", "delete"]);
Todo.updateOptions({new: true, runValidators: true});

module.exports = Todo;
```

## Mapeamento das Rotas

- Primeiramente, dentro da pasta `config` vamos criar um arquivo chamado `routes.js`(arquivo responsável pela mapeamento das rotas).

### Configurações do arquivo routes.js

- Nesse arquivo, iremos criar uma const `express` que irá requisitar/`require` a dependência `express`, o servidor web que roda "em cima" do nodeJS:

``` JS
const express = require("express");
```

- Agora, iremos receber o `server` do arquivo `server.js`, o qual é uma instância do `express`. 
A forma no node que temos para receber um parâmetro, é usando a técnica de exportar uma função que recebe um parâmetro(que nesse caso é `server`) e quando importarmos essa função em outro arquivo teremos que passar uma instância de `server`:

``` JS
const express = require("express");

module.exports = function(server) {

};
```

- Feito isso, iremos fazer o mapeamento das rotas da nossa API. 
Primeiramente, iremos criar uma const `router` que irá receber o `express.Router()`.
Em seguida, iremos chamar o middleware `use` que será expecífico para rotas que começam a partir de `/api`, sempre que a rota começar com `/api` automáticamente o `router`(onde iremos configurar as rotas) será chamado:

``` JS
const express = require("express");

module.exports = function(server) {
  const router = express.Router();
  server.use("/api", router);
};
```

- Em seguida, iremos mapear as rotas de `todo`.
Primeiramente, iremos importar as configurações dos métodos feitas no arquivo `todoService`, para isso iremos requisitar/`require` o arquivo `todoService` através do seu caminho relativo: 

``` JS
const express = require("express");

module.exports = function(server) {
  // API Routes
  const router = express.Router();
  server.use("/api", router);

  // TODO Routes
  const todoService = require("../api/todo/todoService");
};
```

- Em seguida, iremos chamar o método `register` sobre o `todoService`, o qual irá usar todos os métodos que declaramos no arquivo `todoService.js`.
E iremos passar como parâmetro o `router`, para criar dentro dele(o qual só será chamada quando a url começar com `api`, pois determinamos isso acima) o web service com a url base `/todos`:

``` JS
const express = require("express");

module.exports = function(server) {
  // API Routes
  const router = express.Router();
  server.use("/api", router);

  // TODO Routes
  const todoService = require("../api/todo/todoService");
  todoService.register(router, "/todos");
};
```

### Configurações do arquivo loader.js

- Vamos voltar no arquivo `loader.js` e alterar para quando o `require` feito ao arquivo `config/server`(que contém as configurações do servidor) for executado seja retornado/armazenado em `server`:

``` JS
const server = require("./config/server");
require("./config/database");
```

- Feito isso, vamos passar esse `server` como parâmetero para a configuração do router/`config/routes`:

``` JS
const server = require("./config/server");
require("./config/database");
require("./config/routes")(server);
```

### Configurações do arquivo server.js

- Para concluir, vamos voltar no arquivo `server.js`, pois ele não está sendo exportado, portanto não está acessível externamente ocasionando um erro. Para isso, iremos chamar o `module.exports` o qual irá receber o que queremos exportar/expor, que nesse caso é o `server`:

``` JS
const port = 3003;

const bodyParser = require("body-parser");
const express = require("express");
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.listen(port, function() {
  console.log(`BACKEND is running on port ${port}.`);
});

module.exports = server;
```

## Habilitando o CORS

- Primeiramente, na pasta `config` vamos criar o arquivo `cors.js`.

### Configurações do arquivo cors.js

- Vamos exportar uma função que será um middleware que irá receber como parâmetro uma requisição/`req`, um resposta/`res` e o próximo/`next`. Esse middleware irá retornar os cabeçalho/`header` do cors:

``` JS
module.exports = function(req, res, next) {
  // podemos ser mais restritivos colocando apenas as urls que podem acessar nossa api
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(); // irá chamar o próximo middleware
};
```

### Configurações do arquivo server.js

- Voltando no arquivo `server.js` iremos habilitar esse middleware. Para isso, iremos criar uma referência/const `allowCors` o qual será feito um `require` ao arquivo `cors`:

``` JS
const port = 3003;

const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const allowCors = require("./cors");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.listen(port, function() {
  console.log(`BACKEND is running on port ${port}.`);
});

module.exports = server;
```

- E junto com os outros middlewares iremos chamar "em cima" de `server` o middleware `allowCors`:

``` JS
const port = 3003;

const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const allowCors = require("./cors");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors); // permite que a requisição possa vir de uma origem diferente do o local

server.listen(port, function() {
  console.log(`BACKEND is running on port ${port}.`);
});

module.exports = server;
```