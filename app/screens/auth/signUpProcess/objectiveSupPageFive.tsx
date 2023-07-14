import React, { useMemo, useState } from "react"
import {
  Text,
  View,
  Alert,
} from "react-native"

import { useNavigation } from "@react-navigation/native"
import { Button, Icon, Screen, TextField } from "../../../components"
import { loadString } from "../../../utils/storage"
import { colors } from "../../../theme"
import { api } from "../../../services/api"


const RightAccessoryComponent = ({ onIconPress }) => (
  <Icon
    icon="view"
    color={ colors.text}
    onPress={onIconPress}
  />
);


const RightAccessory = React.memo(RightAccessoryComponent);

const ObjectiveSupPageFive = () => {
  const navigation = useNavigation()

  const onRegisterPressed = () => {
    if (password === passwordRepeat) {
      api.post("/user/register",
         JSON.stringify({
          username : username.toLowerCase(),
          email :email.toLowerCase(),
          password,
          weight,
          weight_obj: weightObj,
          objective,
          height,
          zipcode: zipCode,
          address,
          date_birth: dateBirth,
          gender,
          activity_level: activityLevel,
        }))
        .then(response => response.data)
        .then((data:any) => {
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
  const handleIconPress = () => {
    setPassShow(!passwordShow);
  }
  const handleIconPressSecond = () => {
    setPassShowRepeat(!passwordShowRepeat);
  }
  const MemoizedRightAccessory = useMemo(() => {
    return <RightAccessory onIconPress={handleIconPress}  />
  }, [handleIconPress]);

  const MemoizedRightAccessorySecond = useMemo(() => {
    return <RightAccessory onIconPress={handleIconPressSecond}   />
  }, [handleIconPressSecond]);


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
                   RightAccessory={(props) => React.cloneElement(MemoizedRightAccessory, props)}
        />

        <TextField placeholder="Password" value={passwordRepeat} onChangeText={setPasswordRepeat} label="Password"
                   secureTextEntry={passwordShowRepeat}
                   RightAccessory={(props) => React.cloneElement(MemoizedRightAccessorySecond, props)}
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
