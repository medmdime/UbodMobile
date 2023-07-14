import React, { useState } from "react"
import {
  Text,
  View,
  Alert,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Button, Screen, TextField } from "../../../components"
import { loadString, saveString } from "../../../utils/storage"

const ObjectiveSupPageFour = () => {
  const navigation = useNavigation()
  const [High, setHigh] = useState<string>('')
  const [weight, setWeigh] = useState<string>('')
  const [iDwight, setIDwight] = useState<string>('')
  const [objective, setObjective] = useState<string>('')
  const validateHeight = (h) => {
    if (h > 300 || h < 100) {
      Alert.alert("Please enter a valid height (from 100 to 300 cm)");
      return false;
    }
    return true;
  }

  const validateWeight = (w) => {
    if (w > 300 || w < 30) {
      Alert.alert("Please enter a valid weight (from 30 to 300 kg)");
      return false;
    }
    return true;
  }

  const validateIdealWeight = (iw, w, objective) => {
    if (iw > 300 || iw < 30) {
      Alert.alert("Please enter a valid ideal weight (from 30 to 300 kg)");
      return false;
    }
    if ((objective === "1" && w < iw) ||
      (objective === "3" && w > iw) ||
      (objective === "2" && (iw < w - 5 || iw > w + 5))) {
      Alert.alert("Please enter a valid ideal weight");
      return false;
    }
    return true;
  }

  const onSend = async () => {
    if (High.length && weight.length && iDwight.length) {
      const h = parseInt(High)
      const w = parseInt(weight)
      const iw = parseInt(iDwight)

      if (!validateHeight(h) || !validateWeight(w) || !validateIdealWeight(iw, w, objective)) {
        return;
      }

      await saveString("height", High)
      await saveString("weight", weight)
      await saveString("weight_obj", iDwight)

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
          onChangeText={setWeigh}
          multiline={true}
          numberOfLines={1}
        />
        <Text>
          What is your ideal Weight ? (kg)
        </Text>
        <TextField
          keyboardType="number-pad"
          placeholder="Weight"
          value={iDwight}
          placeholderTextColor="#ccc"
          onChangeText={setIDwight}
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
