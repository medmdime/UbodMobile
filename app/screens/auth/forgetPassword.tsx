import React, { useState } from "react"
import {
  View,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Button, TextField } from "../../components"
// @ts-ignore
import Logo from "assets/images/imageWithoutText.png"
import { api } from "../../services/api"
import { translate } from "../../i18n"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const ForgetPassword = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState("")

  const resetOnPress = () : void  => {
    api.post("/user/changepassask", JSON.stringify({
      email,
    })).then(response => response.data)
      .then((data: any) => {
        if (data.message.toString() === "Email Sent") {
          Alert.alert(translate("SignIn.EmailSent" , {tx: "SignIn.EmailSent"}))
          navigation.navigate("SignInScreen" as never)
        } else {
          Alert.alert(translate("SignIn.EmailError" , {tx: "SignIn.EmailError"}) )
        }
      })
      .catch(() => {
        navigation.navigate("Welcome" as never)
      })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.rootcontainer}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <TextField placeholderTx={'SignIn.email'} placeholderTxOptions={{ tx:'SignIn.email'}} labelTx={'SignIn.email'} labelTxOptions={{ tx:'SignIn.email'}} autoComplete="email" value={email} onChangeText={setEmail} />
        <Button
           tx={'SignIn.resetPassword'} txOptions={{ tx:'SignIn.resetPassword'}}
          onPress={resetOnPress}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  CustomButton: {
    flex: 1,
  },

  container: {
    flex: 1,
  },
  logo: {
    marginTop: 10,
    maxHeight: 200,
    maxWidth: 300,
    width: windowWidth * 0.7,
  },
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

export { ForgetPassword }
