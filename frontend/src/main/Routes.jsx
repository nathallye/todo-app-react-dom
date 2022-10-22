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