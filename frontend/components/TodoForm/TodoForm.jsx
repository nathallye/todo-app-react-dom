import React from "react";

import Grid from "../Grid";
import Button from "../Button";

function TodoForm(props) {

  const keyHandler = (e) => { // para executar ações com o teclado
    if (e.key === "Enter") { // se a teclada for igual a enter
      e.shiftKey ? props.handleSearch() : props.handleAdd(); // o shift está precionado ? se sim chama a função de pesquisar, senão(:) chamada a função de adicionar tarefa
    } else if (e.key === "Escape") { // senão se a tecla for esc
      props.handleClear(); // chamar o método de limpar busca
    }
  }

  return (
    <div role="form" className="todoForm">
      <Grid cols="12 9 10">
        <input type="text" id="description" className="form-control" 
          placeholder="Adicione uma tarefa" 
          onChange={props.handleChange} 
          onKeyUp={keyHandler}
          value={props.description} />
      </Grid>
        
      <Grid cols="12 3 2">
        <Button style="primary" icon="plus" onClick={props.handleAdd} />
        <Button style="info" icon="search" onClick={props.handleSearch} />
        <Button style="default" icon="close" onClick={props.handleClear} />
      </Grid>
    </div>
  )
}

export default TodoForm;