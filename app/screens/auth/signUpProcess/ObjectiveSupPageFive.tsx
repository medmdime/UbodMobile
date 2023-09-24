import React, { useMemo, useState } from "react"
import {
  View,
  Alert,
} from "react-native"

import { useNavigation } from "@react-navigation/native"
import {
  Button,
  Screen,
  TextField,
  Text,
  TextFieldAccessoryProps,
  Icon,
} from "../../../components"
import { loadString } from "../../../utils/storage"
import { api } from "../../../services/api"
import { translate } from "../../../i18n"
import { colors } from "../../../theme"

const ObjectiveSupPageFive = () => {
  const navigation = useNavigation()

  const onRegisterPressed = () => {
    if (password === passwordRepeat) {

      api.post("register",
        JSON.stringify({
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          password,
          weight,
          weightObj,
          objective,
          height,
          zipCode,
          address,
          dateBirth,
          gender,
          activityLevel,
        }))
        .then(response =>{console.log(response) ; return response.data})
        .then((data: any) => {

          if (data.error) {
            Alert.alert(data.message.toString())
          } else {
            navigation.navigate("Welcome" as never)
            Alert.alert(data.message.toString())
          }
        })
        .catch(error => {
          console.log(error.message.toString());

          Alert.alert(error.message.toString())
        })
    } else {
      Alert.alert("Passwords do not match")
    }
  }

  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordRepeat, setPasswordRepeat] = useState<string>("")
  const [objective, setObjective] = useState<string>("")
  const [weight, setWeight] = useState<string>("")
  const [weightObj, setWeightObj] = useState<string>("")
  const [height, setHeight] = useState<string>("")
  const [zipCode, setZipCode] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [dateBirth, setDateBirth] = useState<string>("")
  const [activityLevel, setActivityLevel] = useState<string>("")
  const [gender, setGender] = useState<string>("")
  const [passwordShow, setPassShow] = useState<boolean>(true)
  const [passwordShowRepeat, setPassShowRepeat] = useState<boolean>(true)


  loadString("objective").then(value => {
    if (value) {
      setObjective(value)
    } else {
      Alert.alert("objective")
    }
  })

  loadString("weight").then(value => {
    if (value) {
      setWeight(value);
    } else {
      Alert.alert("weight")
    }
  })
  loadString("weight_obj").then(value => {
    if (value) {
      setWeightObj(value)
    } else {
      Alert.alert("weight_obj")
    }
  })
  loadString("height").then(value => {
    if (value) {
      setHeight(value)
    } else {
      Alert.alert("err4")
    }
  })
  loadString("zipcode").then(value => {
    if (value) {
      setZipCode(value)
    } else {
      Alert.alert("err5")
    }
  })

  loadString("address").then(value => {
    if (value) {
      setAddress(value)
    } else {
      Alert.alert("err6")
    }
  })

  loadString("date_birth").then(value => {
    if (value) {
      setDateBirth(value)
    } else {
      Alert.alert("err7")
    }
  })

  loadString("activity_level").then(value => {
    if (value) {
      setActivityLevel(value)
    } else {
      Alert.alert("err7")
    }
  })

  loadString("gender").then(value => {
    if (value) {
      setGender(value)
    } else {
      Alert.alert("err7")
    }
  })

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

  const PasswordRightAccessoryRepeat = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={passwordShowRepeat ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            onPress={() => setPassShowRepeat(!passwordShowRepeat)}
          />
        )
      },
    [passwordShowRepeat],
  )

  return (
    <Screen preset={"scroll"}>
      <View>
        <TextField
          placeholderTx={"SignUp.ObjectiveSupPageFive.placeholderUsername"}
          placeholderTxOptions={{ tx: "SignUp.ObjectiveSupPageFive.placeholderUsername" }}
          labelTx={"SignUp.ObjectiveSupPageFive.titleCreateAccount"}
          labelTxOptions={{ tx: "SignUp.ObjectiveSupPageFive.titleCreateAccount" }}
          value={username}
          onChangeText={setUsername}
        />
        <TextField
          placeholderTx={"SignUp.ObjectiveSupPageFive.placeholderEmail"}
          placeholderTxOptions={{ tx: "SignUp.ObjectiveSupPageFive.placeholderEmail" }}
          labelTx={"SignUp.ObjectiveSupPageFive.placeholderEmail"}
          labelTxOptions={{ tx: "SignUp.ObjectiveSupPageFive.placeholderEmail" }}
          value={email}
          onChangeText={setEmail}
        />
        <TextField value={password} onChangeText={setPassword} labelTx={"SignUp.ObjectiveSupPageFive.labelPassword"}
                   labelTxOptions={{ tx: "SignUp.ObjectiveSupPageFive.labelPassword" }}
                   placeholderTx={"SignUp.ObjectiveSupPageFive.placeholderPassword"}
                   placeholderTxOptions={{ tx: "SignUp.ObjectiveSupPageFive.placeholderPassword" }}
                   secureTextEntry={passwordShow}
                   RightAccessory={PasswordRightAccessory}
        />

        <TextField value={passwordRepeat} onChangeText={setPasswordRepeat}
                   labelTx={"SignUp.ObjectiveSupPageFive.placeholderPasswordRepeat"}
                   labelTxOptions={{ tx: "SignUp.ObjectiveSupPageFive.placeholderPasswordRepeat" }}
                   placeholderTx={"SignUp.ObjectiveSupPageFive.placeholderPasswordRepeat"}
                   placeholderTxOptions={{ tx: "SignUp.ObjectiveSupPageFive.placeholderPasswordRepeat" }}
                   secureTextEntry={passwordShowRepeat}
                   RightAccessory={PasswordRightAccessoryRepeat}
        />
      </View>
      <Button
        tx={"SignUp.ObjectiveSupPageFive.buttonRegister"}
        txOptions={{ tx: "SignUp.ObjectiveSupPageFive.buttonRegister" }}
        onPress={onRegisterPressed}
      />
      <Text>
        {translate("SignUp.ObjectiveSupPageFive.textTermsCondition", { tx: "SignUp.ObjectiveSupPageFive.textTermsCondition" })}
        <Text tx={"SignUp.ObjectiveSupPageFive.textTermsOfUse"}
              txOptions={{ tx: "SignUp.ObjectiveSupPageFive.textTermsOfUse" }} /> and
        <Text tx={"SignUp.ObjectiveSupPageFive.textPrivacyPolicy"}
              txOptions={{ tx: "SignUp.ObjectiveSupPageFive.textPrivacyPolicy" }} />
      </Text>
    </Screen>
  )
}

export { ObjectiveSupPageFive }
