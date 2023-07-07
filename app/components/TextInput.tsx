import * as React from 'react';
import {  TextInput as TextIn } from "react-native-paper"
import { StyleSheet } from "react-native"
import { colors } from "../theme"
import { Props } from "react-native-paper/src/components/TextInput/TextInput"

interface  TextInputCustomProps extends Props{

}
const TextInput :React.FC<TextInputCustomProps>= (props)  => {
  return (
    <TextIn style={styles.container}
      label={props.label}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      mode={'outlined'}
      outlineColor={colors.border}
      activeOutlineColor={colors.border}
            secureTextEntry={props.secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  container : {
    backgroundColor: colors.background,
    border: 0,
    color:colors.text,
    width:'100%',
  }

})

export { TextInput };