import React, { useMemo, useState } from "react"
import {
  View,
  Image,
  StyleSheet,
  Dimensions, Alert,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Button, Icon, Screen, TextField, TextFieldAccessoryProps } from "../../components"
// @ts-ignore
import Logo from "assets/images/imageWithoutText.png"
import { useLogin } from "../../context"
import { colors } from "../../theme"
import { saveString } from "../../utils/storage"
import { api } from "../../services/api"
import { translate } from "../../i18n"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height


const SignInScreen = () => {
  const { setUser, setIsLogged } = useLogin()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordShow, setPassShow] = useState<boolean>(true)
  const navigation = useNavigation()
  const onForgotPassword = () => {
    navigation.navigate("ForgetPassword" as never)
  }
  const onSignUpPressed = () => {
    navigation.navigate("ObjectiveSupPageOne" as never)

  }
  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={passwordShow ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            onPress={() => setPassShow(!passwordShow)}
          />
        )
      },
    [passwordShow],
  )

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
           // TODO : UPDATE ERROR MESSAGE HERE
          Alert.alert("Error", error.message.toString())
        })
    } else {
      Alert.alert(translate("errorScreen.title",  { tx:'errorScreen.title'}))
    }
  }


  return (
    <Screen preset={"scroll"}>
      <View style={styles.root}>
        <View style={styles.rootcontainer}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          <TextField placeholderTx={'SignIn.email'} placeholderTxOptions={{ tx:'SignIn.email'}} labelTx={'SignIn.email'} labelTxOptions={{ tx:'SignIn.email'}} autoComplete="email" value={email} onChangeText={setEmail}
                     blurOnSubmit={true} inputMode={"email"}  />

          <TextField placeholderTx={'SignIn.password'} placeholderTxOptions={{ tx:'SignIn.password'}} labelTx={'SignIn.password'} labelTxOptions={{ tx:'SignIn.password'}} value={password} onChangeText={setPassword} autoComplete="password"
                     secureTextEntry={passwordShow}
                     RightAccessory={PasswordRightAccessory}
                      />
          <Button tx="SignIn.button" txOptions={{ tx: "SignIn.button" }} onPress={SignInPressed} />
          <Button tx="SignIn.forgotPassword" txOptions={{ tx: "SignIn.forgotPassword" }} onPress={onForgotPassword} />
        </View>
        <View style={styles.CustomButton}>
          <Button tx="SignIn.noAccount" txOptions={{ tx: "SignIn.noAccount" }} onPress={onSignUpPressed} />
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
