import React, { useState } from "react"
import {
  View,
  Image,
  StyleSheet,
  Dimensions, Alert, ScrollView,
} from "react-native"
// import {useNavigation} from '@react-navigation/native';
import { Button, Icon, Screen, TextField } from "../../components"
// @ts-ignore
import Logo from "assets/images/imageWithoutText.png"
import { useLogin } from "../../context"
import { colors } from "../../theme"
import { saveString } from "../../utils/storage"
import { useNavigation } from "@react-navigation/native"
import { api } from "../../services/api"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const SignInScreen = () => {
  const { setUser, setIsLogged } = useLogin()

  const navigation = useNavigation()
  const onForgotPassword = () => {
    navigation.navigate('ForgetPassword' as never);
  }
  const onSignUpPressed = () => {
    navigation.navigate('ObjectiveSupPageOne' as never);

  }
  const SignInPressed = () => {
    if (email.length && password.length) {
      api.post("/user/login", JSON.stringify({
        email: email.toLowerCase(),
        password,
      })).then(response => response.data)
        .then((data: any) => {
          if (data.message.toString() === "Login Successful") {
            saveString("jwt", data.token.toString())
            setUser(data.user)
            setIsLogged(true) // Update state variable here
          } else {
            Alert.alert(data.message.toString())
          }
        })
        .catch(error => {
          Alert.alert("Error", error.message.toString())
        })
    } else {
      Alert.alert("enter a value plz")
    }
  }

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordShow, setPassShow] = useState<boolean>(true)
  return (
    <Screen preset={'scroll'}  >
      <View style={styles.root}>
        <View style={styles.rootcontainer}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          <TextField placeholder="Email" label="Email" autoComplete="email" value={email} onChangeText={setEmail}
                     blurOnSubmit={true} inputMode={"email"} />
          <TextField placeholder="Password" value={password} onChangeText={setPassword} label="Password"
                     secureTextEntry={passwordShow}
                     RightAccessory={(props) => <Icon icon="view" containerStyle={props.style} color={colors.text}
                                                      onPress={() => setPassShow(!passwordShow)} />} />
          <Button text="SIGN IN" onPress={SignInPressed} />
          <Button text="Forgot Password ?" onPress={onForgotPassword} />
        </View>
        <View style={styles.CustomButton}>
          <Button text="Don't have an account ? Create one " onPress={onSignUpPressed} />
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  CustomButton: {
    flex: 1,
  },
  logo: {
    marginTop: 10,
    maxHeight: 100,
    maxWidth: 100,
    tintColor: colors.black,
    width: windowWidth * 0.7,
  },
  root: {},
  rootcontainer: {
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    height: windowHeight * 0.8,
    justifyContent: "flex-start",
    maxWidth: 400,
    width: windowWidth * 0.8,
  },
})
export { SignInScreen }
