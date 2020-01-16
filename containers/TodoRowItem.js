import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import config from '../config';

import Icon from 'react-native-vector-icons/FontAwesome';
import {bindActionCreators} from "redux";
import * as TodosActions from "../actions/TodosActions";

class TodoRowItem extends Component{
  render() {
      const {todo, source} = this.props;
      const {text} = todo;
      const {deleteTodo} = this.props;

      return (
          <View style={styles.row} key={todo.id}>
              <View style={styles.timeline}>
                  <View style={styles.timelineVerticalLink}/>
                  <Icon
                      style={styles.icon}
                      name={config.icons.circle}
                      size={config.constants.row_timeline_icon_size}
                  />
              </View>
              <View style={styles.content}>
                  <Text style={styles.text}>{text}</Text>
              </View>
              <View>
                  <TouchableOpacity onPress={() => deleteTodo(todo.id,source)}>
                      <Icon
                          style={styles.trash}
                          name={config.icons.trash}
                          size={config.constants.row_timeline_icon_size}
                      />
                  </TouchableOpacity>
              </View>
          </View>

      )
  }
}


const styles = StyleSheet.create({
    row: {
        backgroundColor: '#313842',
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 70,
    },
    timeline: {
        height: 70,
        width: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timelineVerticalLink: {
        height: 70,
        width: 1,
        backgroundColor: '#526373',
        justifyContent: 'center'
    },
    icon: {
        color: '#e7d629',
        backgroundColor: 'transparent',
        position: 'absolute',
        alignItems: 'center'
    },

    trash: {
        fontSize: 24,
        color: '#FF6619',
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
    },
    text: {
        fontSize: 17,
        fontWeight: '500',
        color: 'white',
        alignItems: 'center',
        position: 'absolute',
        paddingLeft: 5
    },
    time: {
        fontSize: 10,
        fontWeight: '400',
        color: '#828B7B',
    }
});

const mapStateToProps = (state) => ({
    todosReducer: state.todos
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(TodosActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoRowItem);
