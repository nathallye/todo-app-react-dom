// import - export -> padrão ecmascript 2011(ES6)
// require -> padrão CommonJS (a maneira que o Node.js criou para importar e exportar modulos dentro de uma aplicação)
// webpack suporta os dois formatos, mas como estamos trabalhando com react(js) iremos usar o import - export para padronizar
import "modules/bootstrap/dist/css/bootstrap.min.css";
import "modules/font-awesome/css/font-awesome.min.css"; // modules - apelido definido dentro de webpack.config para o diretório node_modules

import React from "react";
import Menu from "../../components/Menu";
import Routes from "./Routes";

function App(props) {
  return (
    <div className="container">
      <Menu />
      <Routes />
    </div>
  );
}

export default App;