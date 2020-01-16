import React, {Component} from 'react';
import {connect} from 'react-redux';
import commonStyles from './styles/CommonStyles'
import config from '../config';
import {bindActionCreators} from 'redux';
import * as TodosActions from '../actions/TodosActions'
import styles from './styles/ActiveTodosStyle';
import {FlatList, Dimensions} from 'react-native';
import SwipeView from 'react-native-swipeview';

import Icon from 'react-native-vector-icons/FontAwesome';


import {
    View,
} from 'react-native';

import Title from "../components/Title";
import Input from "./Input";
import TodoRowItem from "./TodoRowItem";
import moment from "moment";

class TodosHome extends Component {
    render() {

        this.leftOpenValue = Dimensions.get('window').width;
        this.rightOpenValue = -Dimensions.get('window').width;
        const {todosReducer} = this.props;
        const {active} = todosReducer;
        const {todos} = active;
        const {addTodo, partialCompleteActiveTodo, completeTodo} = this.props;
        return (
            <View style={commonStyles.container}>
                {<Title title="My Todo List!"/>}
                <View style={styles.header}>
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder={config.constants.active_todos_screen.add_todo_placeholder}
                            placeholderTextColor={config.colors.white}
                            selectionColor={config.colors.golden}
                            underlineColorAndroid={config.colors.transparent}
                            maxLength={config.constants.active_todos_screen.add_todo_input_maxlength}
                            clearTextOnFocus={config.constants.active_todos_screen.add_todo_input_clear_text_on_focus}
                            onSubmitEditing={addTodo}x
                        />
                    </View>
                </View>
                <FlatList
                    data={todos}
                    keyExtractor={todo => todo.id}
                    enableEmptySections={true}
                    ItemSeparatorComponent={() => <View style={commonStyles.separator}/>}
                    renderItem={({item, index}) => (
                        <SwipeView
                            renderVisibleContent={() => (
                                <TodoRowItem
                                    todo={{...item}}
                                    index={index}
                                    source='todo_list'
                                    time={moment().startOf('hour').fromNow()}
                                />
                            )}
                            renderLeftView={() => (
                                <View style={commonStyles.rowLeft}>
                                    <Icon
                                        style={commonStyles.icon}
                                        name={config.icons.check}
                                        size={config.constants.hidden_row_icon_size}
                                    />
                                </View>
                            )}
                            renderRightView={() => (
                                <View style={commonStyles.rowRight}>
                                    <Icon
                                        style={commonStyles.icon}
                                        name={config.icons.clock}
                                        size={config.constants.hidden_row_icon_size}
                                    />
                                </View>
                            )}
                            leftOpenValue={this.leftOpenValue}
                            rightOpenValue={this.rightOpenValue}
                            swipeDuration={config.constants.row_swipe_duration}
                            swipeToOpenPercent={config.constants.row_swipe_open_percent}
                            onSwipedLeft={() => partialCompleteActiveTodo(index, true)}
                            onSwipedRight={() => {
                                completeTodo(index);
                                partialCompleteActiveTodo(index);
                            }}

                        />
                    )}
                />

            </View>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(TodosActions, dispatch);
};

const mapStateToProps = state => ({
    todosReducer: state.todos
});

export default connect(mapStateToProps, mapDispatchToProps)(TodosHome);