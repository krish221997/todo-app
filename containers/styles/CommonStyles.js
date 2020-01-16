import React from 'react';
import { StyleSheet, Platform } from 'react-native';

const commonStyles = StyleSheet.create({
  container: {
    marginTop: (Platform.OS === 'ios') ? 0 : 0,
    flex: 1,
    backgroundColor: '#182129',
  },
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'green'
  },
  rowRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFC34D'
  },
  icon: {
    color: 'white',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#182129',
  }
});

export default commonStyles;
