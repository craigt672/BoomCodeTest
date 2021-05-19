import React from "react";
import {
  View, Text, TextInput as Input, StyleSheet, TouchableOpacity
} from "react-native";

const styleSheet = StyleSheet.create({
  form: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputView: {
    width: "100%",
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 5
  },
  italic: {
    fontStyle: 'italic',
    color: 'red',
  },
  selected: {
    color: '#1876D1',
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  textInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#202020",
    borderRadius: 10,
    height: 50,
    width: "100%",
    padding: 10,
    backgroundColor: '#F3F4F5'
  }
});

export const TextInput = ({ title, ...props }) => {
  return (
    <View style={styleSheet.inputView}>
      <Text style={styleSheet.text}>{title}</Text>
      <Input
        style={styleSheet.textInput}
        autoCapitalize='none'
        {...props}
      />
    </View>
  );
}

export const SelectInputText = ({ disable=false, italic = false, isSelected, children, onSelectText }) => {
  return italic ? (
    <Text style={{ ...styleSheet.text, ...styleSheet.italic }}>{children}</Text>
  ) : (
    <TouchableOpacity disabled={disable} onPress={onSelectText}>
      <Text style={!isSelected ? styleSheet.text : { ...styleSheet.text, ...styleSheet.selected }}>{children}</Text>
    </TouchableOpacity>
  )
}
