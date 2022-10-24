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
    this.setState({ ...this.state, description: e.target.value }); // iremos pegar com o operador spreed o estado atual, e passar somente para o description o valor capturado no evento
  }

  handleAdd() {
    // console.log(this); // => null - para resolver isso iremos criar um construtor
    // console.log(this.state.description);
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