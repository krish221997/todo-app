import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import TodoScreen from "../containers/TodosHome";
import PartiallyCompletedTodosScreen from "../containers/PartiallyCompletedTodos";
import CompletedTodosScreen from "../containers/CompletedTodos";

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const TodosStack = createStackNavigator(
  {
    Home: TodoScreen,
  },
  config
);

TodosStack.navigationOptions = {
  tabBarLabel: 'Todos List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-options'
          : 'md-options'
      }
    />
  ),
};

TodosStack.path = '';

const CompletedStack = createStackNavigator(
  {
    Links: CompletedTodosScreen,
  },
  config
);

CompletedStack.navigationOptions = {
  tabBarLabel: 'Completed List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-done-all' : 'md-done-all'} />
  ),
};

CompletedStack.path = '';


const PartiallyCompletedStack = createStackNavigator(
  {
    Settings: PartiallyCompletedTodosScreen,
  },
  config
);

PartiallyCompletedStack.navigationOptions = {
  tabBarLabel: 'Partial List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-clock' : 'md-clock'} />
  ),
};

PartiallyCompletedStack.path = '';

const tabNavigator = createBottomTabNavigator({
  TodosStack,
  CompletedStack,
  PartiallyCompletedStack
});

tabNavigator.path = '';

export default tabNavigator;
