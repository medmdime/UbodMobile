import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions, Alert
} from "react-native"
// import {useNavigation} from '@react-navigation/native';
import { Button , TextInput } from "../../components"
// @ts-ignore
import Logo from "assets/images/imageWithoutText.png"
import { useLogin } from "../../context"
import { colors } from "../../theme"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SignInScreen = () => {
  const {setUser, setIsLogged} = useLogin();

  // const navigation = useNavigation();

  const onForgotPassword = () => {
    // navigation.navigate('ForgetPassword');
  };
  const onSignPressed = () => {
    // navigation.navigate('Objectif');
  };
  const SignInpressed = () => {
    Alert.alert('SignInpressed');

  };

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.root}>
        <View style={styles.rootcontainer}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          <TextInput placeholder="Email"  label='Email' autoComplete="email" value={email} onChangeText={setEmail} mode={'outlined'} />
          <TextInput placeholder="Password" value={password} onChangeText={setPassword} mode={'outlined'} label='Password' secureTextEntry={true} />
          <Button text="SIGN IN" onPress={SignInpressed} />
          <Button text="Forgot Password ?" onPress={onForgotPassword} />
        </View>
        <View style={styles.CustomButton}>
          <Button text="Don't have an account ? Create one " onPress={onSignPressed} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  CustomButton: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  logo: {
    marginTop: 10,
    maxHeight: 100,
    maxWidth: 100,
    tintColor:colors.black,
    width: windowWidth * 0.7
  },
  root: {
    borderColor: 'red',
  },
  rootcontainer: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    height: windowHeight * 0.8,
    justifyContent: 'flex-start',
    maxWidth: 400,
    width: windowWidth * 0.8,
  },
});
export { SignInScreen } ;
