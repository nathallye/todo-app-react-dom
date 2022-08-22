# Todo App - Backend

## Criação do arquivo package.json

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

## Alterações iniciais no projeto

- Com o projeto aberto editor de texto.

### Alterações no arquivo package.json

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
    "dev": "nodemon",
    "production": "pm2 start src/loader --name todo-app"
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

