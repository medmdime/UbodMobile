import React, { useState } from "react"
import {
  Text,
  View,
  Alert,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Button, Screen, TextField } from "../../../components"
import { loadString, save } from "../../../utils/storage"

const ObjectiveSupPageFour = () => {
  const navigation = useNavigation()
  const [High, setHigh] = useState<string>('')
  const [weight, setweight] = useState<string>('')
  const [iDweight, setIDweight] = useState<string>('')
  const [objective, setObjective] = useState<string>('')
  const onSend = async () => {
    if (High.length && weight.length && iDweight.length ) {
      const h = parseInt(High)
      const w = parseInt(weight)
      const iw = parseInt(iDweight)


      if (h > 300 || h < 100) {
        Alert.alert("Please enter a valid height (from 100 to 300 cm)")
        return
      }
      if (w > 300 || w < 30) {
        Alert.alert("Please enter a valid weight (from 30 to 300 kg)")
        return
      }
      if (iw > 300 || iw < 30) {
        Alert.alert("Please enter a valid ideal weight (from 30 to 300 kg)")
        return
      } else if (objective === "1") {
        if (weight < iDweight) {
          Alert.alert(
            "Please enter a valid ideal weight (inferior to your weight)",
          )
          return
        }
      } else if (objective === "2") {
        if (iw < w - 5 || iw > w + 5) {
          Alert.alert(
            "Please enter a valid ideal weight (between 5kg inferior and 5kg superior to your weight)",
          )
          return
        }
      } else if (objective === "3") {
        if (weight > iDweight) {
          Alert.alert(
            "Please enter a valid ideal weight (superior to your weight)",
          )
          return
        }
      }

      await save("height", High)
      await save("weight", weight)
      await save("weight_obj", iDweight)

      navigation.navigate("ObjectiveSupPageFive" as never)
    }
  }

  loadString("objective").then(value => {
    if (value) {
      setObjective(value)
    } else {
      Alert.alert("err1")
    }
  })

  return (
    <Screen preset={"scroll"}>
      <View>
        <Text> What is your height ? (cm)</Text>
        <TextField
          keyboardType="number-pad"
          placeholder="Heigh"
          value={High}
          placeholderTextColor="#ccc"
          onChangeText={setHigh}
          multiline={true}
          numberOfLines={1}
        />
        <Text> What is your Weight ? (kg)</Text>
        <TextField
          keyboardType="number-pad"
          placeholder="Weight"
          placeholderTextColor="#ccc"
          value={weight}
          onChangeText={setweight}
          multiline={true}
          numberOfLines={1}
        />
        <Text>
          What is your ideal Weight ? (kg)
        </Text>
        <TextField
          keyboardType="number-pad"
          placeholder="Weight"
          value={iDweight}
          placeholderTextColor="#ccc"
          onChangeText={setIDweight}
          multiline={true}
          numberOfLines={1}
        />
      </View>

      <View>
        <Button text="NEXT" onPress={onSend} />
      </View>
    </Screen>
  )
}
export { ObjectiveSupPageFour }
