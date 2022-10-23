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
        <Button style="primary" icon="plus"></Button>
      </Grid>
    </div>
  )
}

export default TodoForm;