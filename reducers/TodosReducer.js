import Todo from "../models/Todo";

let todoFour = new Todo({'id': 4, 'text': 'Watch Movie'});
todoFour.setType('completed');

let todoFive = new Todo({'id': 5, 'text': 'Get Netflix'});
todoFive.setType('completed');

let todoSix = new Todo({'id': 6, 'text': 'Go to College'});
todoFour.setType('archived');

let todoSeven = new Todo({'id': 7, 'text': 'Drink Water'});
todoFive.setType('archived');

const initialState = {
    active: {
        todos: [new Todo({'id': 1, 'text': 'Go for a walk'}), new Todo({'id': 2, 'text': 'Meeting at 11 AM'}),
            new Todo({'id': 3, 'text': 'Coffee in morning'})],
    },
    completed: {
        todos: [todoFour, todoFive],
    },
    partially_completed: {
        todos: [todoSix, todoSeven]
    }
};

const todosReducer = (state = initialState, action) => {
    const {active, completed, partially_completed} = state;

    const activeTodos = active.todos;
    const completedTodos = completed.todos;
    const partiallyCompletedTodos = partially_completed.todos;
    const {type, payload} = action;

    switch (type) {
        case 'add_todo':
            return {
                ...state,
                active: {
                    ...state.active,
                    todos: [payload, ...activeTodos]
                }
            };

        case 'partial_complete_todo':
            const t = activeTodos.filter((todo, i) => payload.index == i);
            const delete_text = t[0]["text"];
            const delete_id = t[0]["id"];
            if (payload.partial) {
                return {
                    ...state,
                    active: {
                        ...state.active,
                        todos: activeTodos.filter((todo, i) => payload.index != i),
                    },
                    partially_completed: {
                        ...state.partially_completed,
                        todos: [{id: delete_id, text: delete_text}, ...partiallyCompletedTodos]
                    }
                };
            }
            else {
                return {
                    ...state,
                    active: {
                        ...state.active,
                        todos: activeTodos.filter((todo, i) => payload.index != i),
                    },
                }
            }


        case 'complete_todo':
            let completedTodo;
            return {
                ...state,
                active: {
                    ...state.active,
                    todos: activeTodos.map((todo, index) => {
                        if (index === payload) {
                            completedTodo = todo;
                            return {
                                ...todo,
                                completed: !todo.completed,
                            }
                        }
                        return todo
                    }),
                },
                completed: {
                    todos: [completedTodo, ...completedTodos]
                }
            };

        case 'delete_todo':
            switch (payload.source) {
                case 'todo_list':
                    return {
                        ...state,
                        active: {
                            todos: activeTodos.filter((todo, i) => payload.index != todo.id)
                        }
                    };
                case 'partial_complete_list':
                    return {
                        ...state,
                        partially_completed: {
                            todos: partiallyCompletedTodos.filter((todo, i) => payload.index != todo.id)
                        }
                    };
                case 'completed_list':
                    return {
                        ...state,
                        completed: {
                            todos: completedTodos.filter((todo, i) => payload.index != todo.id)
                        }
                    }
            }

        default:
            return state;
    }
};

export default todosReducer;