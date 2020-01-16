import uuid from 'uuid';

class Todo {

  constructor(todo) {
    this.id = uuid.v1();
    this.text = todo.text;
    this.type = 'active';
    this.completed = false;
  }

  setType = (type) => this.type = type;

}

export default Todo;
