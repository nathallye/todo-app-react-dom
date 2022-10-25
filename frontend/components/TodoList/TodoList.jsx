import React from "react";
import Button from "../Button";

function TodoList(props) {

  console.log(props);

  const renderRows = () => {
    const list = props.list ? props.list : []; // se props.list existir list recebe props.list senão um array vazio

    return list.map(todo => (
      // _id gerado pelo próprio mongo
      <tr key={todo._id}> 
        <td className={todo.done ? "markedAsDone" : ""}>{todo.description}</td>
        <td>
          <Button style="success" icon="check" hide={todo.done} 
            onClick={() => props.handleMarkAsDone(todo)} />
          <Button style="warning" icon="undo" hide={!todo.done}
            onClick={() => props.handleMarkAsPending(todo)} />
          <Button style="danger" icon="trash-o" hide={!todo.done} 
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