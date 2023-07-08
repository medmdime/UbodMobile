import React, { useState } from "react"
import {
  Text,
  View,
  Alert,
} from "react-native"

import { useNavigation } from "@react-navigation/native"
import { Button, Icon, Screen, TextField } from "../../../components"
import { loadString } from "../../../utils/storage"
import { colors } from "../../../theme"

const ObjectiveSupPageFive = () => {
  const navigation = useNavigation()
  const ErrorMessage = ({ password, passwordRepeat }) => {
    if (password === passwordRepeat || passwordRepeat === "") {
      return <Text></Text>
    } else {
      return <Text>The passwords do not match.</Text>
    }
  }

  const onRegisterPressed = () => {
    if (password === passwordRepeat) {
      fetch("https://ubod.online/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username : username.toLowerCase(),
          email :email.toLowerCase(),
          password,
          weight,
          weight_obj,
          objective,
          height,
          zipcode,
          address,
          date_birth,
          gender,
          activity_level,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            Alert.alert(data.message.toString())
          } else {
            navigation.navigate("Welcome" as never)
            Alert.alert(data.message.toString())
          }
        })
        .catch(error => {
          Alert.alert(error.message.toString())
        })
    } else {
      Alert.alert("Passwords do not match")
    }
  }
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordRepeat, setPasswordRepeat] = useState("")
  const [objective, setObjective] = useState("")
  const [weight, setWeight] = useState("")
  const [weight_obj, setWeight_obj] = useState("")
  const [height, setHeight] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [address, setAddress] = useState("")
  const [date_birth, setDate_birth] = useState("")
  const [activity_level, setActivity_level] = useState("")
  const [gender, setGender] = useState("")
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
      console.log(value)
    } else {
      Alert.alert("weight")
    }
  })
  loadString("weight_obj").then(value => {
    if (value) {
      setWeight_obj(value)
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
      setZipcode(value)
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
      setDate_birth(value)
    } else {
      Alert.alert("err7")
    }
  })

  loadString("activity_level").then(value => {
    if (value) {
      setActivity_level(value)
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
  return (
    <Screen preset={"scroll"}>

      <View>
        <Text> Create an account</Text>
        <TextField
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextField placeholder="Password" value={password} onChangeText={setPassword} label="Password"
                   secureTextEntry={passwordShow}
                   RightAccessory={(props) => <Icon icon="view" containerStyle={props.style} color={colors.text}
                                                    onPress={() => setPassShow(!passwordShow)} />} />
        <TextField placeholder="Password" value={passwordRepeat} onChangeText={setPasswordRepeat} label="Password"
                   secureTextEntry={passwordShowRepeat}
                   RightAccessory={(props) => <Icon icon="view" containerStyle={props.style} color={colors.text}
                                                    onPress={() => setPassShowRepeat(!passwordShowRepeat)} />} />
        <ErrorMessage
          password={password}
          passwordRepeat={passwordRepeat}
        />
      </View>
      <Button
        text="Register"
        onPress={onRegisterPressed}
      />
      <Text>
        By registering, you confirm that you accept our{" "}
        <Text>Terms of Use </Text> and{" "}
        <Text>Privacy Policy</Text>
      </Text>

    </Screen>
  )
}

export { ObjectiveSupPageFive }
