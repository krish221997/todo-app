import React, {Component} from 'react';
import {TextInput, StyleSheet, Dimensions} from 'react-native'

class Input extends Component {
    state = {
        text: ''
    };

     onChangeText = (text) => {
            this.setState({text: text})
        };

    onSubmitEditing = () => {
    const {onSubmitEditing} = this.props;
    const {text} = this.state;

    if (!text)
      return;
    onSubmitEditing(text);
    this.setState({ text: '' });
  };


    render() {

        const {placeholder, placeholderTextColor} = this.props;
        const {selectionColor, underlineColorAndroid} = this.props;
        const {maxLength, clearTextOnFocus} = this.props;
        const {text} = this.state;

        return (
            <TextInput
                style={styles.input}
                value={text}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                selectionColor={selectionColor}
                underlineColorAndroid={underlineColorAndroid}
                maxLength={maxLength}
                clearTextOnFocus={clearTextOnFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitEditing}
            />
        )
    }
}

const styles = StyleSheet.create({
  input: {
    padding: 12,
    backgroundColor: '#526373',
    color: 'white',
    fontSize: 15,
    borderRadius: 3,
    width: Dimensions.get('window').width * 0.7,
  },
});

export default Input;