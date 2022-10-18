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

### Criação da pasta src, suas subpastas e arquivos

- Na raiz do projeto vamos criar a pasta `src` e dentro dela a subpasta `config` e o arquivo `loader.js`(arquivo que irá os principais arquivos de configuração do projeto); dentro da pasta `config` vamos criar o arquvivo `server.js`(arquivo relativo ao Express onde iremos startar o servidor).

#### Configurações do arquivo loader.js

- O `loader.js` é o arquivo que irá os principais arquivos de configuração do projeto, por tanto, inicialmente dentro desse arquivo iremos fazer um `require` do arquivo `server.js`:

``` JS
require("./config/server");
```

#### Configurações do arquivo server.js

- Feito isso, no `server.js`, arquivo relativo ao Express onde iremos startar o servidor. Iremos criar uma const `port` que irá receber a porta que essa aplicação irá rodar:

``` JS
const port = 3003;
```

- Em seguida, iremos criar uma const `bodyParser` que irá requisitar/`require` da dependência `body-parser`, a qual irá fazer o "parser"/analisar o corpo da requisição:

``` JS
const port = 3003;

const bodyParser = require("body-parser");
```

- Feito isso, iremos criar uma const `express` que irá requisitar/`require` da dependência `express`, o servidor web que roda "em cima" do nodeJS:

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

#### Startando a aplicação Back-End

- Agora, podemos startar a aplicação usando o `nodemon` indo no terminal e rodando o comando seguinte: 

```
npm run dev
```

## Conexão com o Banco de Dados


