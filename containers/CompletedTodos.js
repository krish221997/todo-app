import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import commonStyles from "./styles/CommonStyles";
import Title from "../components/Title";
import {FlatList, Dimensions} from 'react-native';
import * as TodosActions from "../actions/TodosActions";
import moment from "moment";
import TodoRowItem from "./TodoRowItem";
import SwipeView from 'react-native-swipeview';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../config';


class CompletedTodos extends Component {

    render() {

        const {todosReducer} = this.props;
        const {completed} = todosReducer;
        const {todos} = completed;

        this.rightOpenValue = -Dimensions.get('window').width;

        return (
            <View style={commonStyles.container}>
                {<Title title="Completed List!"/>}
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
                                    source='completed_list'
                                    time={moment().endOf('hour').fromNow()}
                                />
                            )}
                            renderRightView={() => (
                                <View style={commonStyles.rowRight}>
                                    <Icon
                                        style={commonStyles.icon}
                                        name={config.icons.times}
                                        size={config.constants.hidden_row_icon_size}
                                    />
                                </View>
                            )}
                            rightOpenValue={this.rightOpenValue}
                            swipeDuration={config.constants.row_swipe_duration}
                            swipeToOpenPercent={config.constants.row_swipe_open_percent}
                            disableSwipeToRight={config.constants.completed_todos_screen.disable_right_swipe}
                            disableSwipeToLeft={config.constants.completed_todos_screen.disable_left_swipe}
                        />
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});

const mapStateToProps = (state) => ({
    todosReducer: state.todos
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(TodosActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CompletedTodos);