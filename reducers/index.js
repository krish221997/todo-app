import {combineReducers} from "redux";
import todosReducer from './TodosReducer';

export default combineReducers({
    todos: todosReducer
});