import Todo from "../models/Todo";

export function addTodo(todo) {
    return {
        type: 'add_todo',
        payload: new Todo({text:todo})
    }
}

export function partialCompleteActiveTodo(index, partial=false) {
    return {
        type: 'partial_complete_todo',
        payload: {index:index, partial:partial}
    }
}

export function completeTodo(index) {
  return {
    type: 'complete_todo',
    payload: index
  }
}

export function deleteTodo(index, source) {
    return {
        type: 'delete_todo',
        payload: {index:index, source: source}
    }
}
