import React, { useState } from "react"
import {
  View,
  ScrollView,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Button, Text } from "../../../components"
import { save } from "../../../utils/storage"
import { RadioButton } from "react-native-paper"


const ObjectiveSupPageOne = () => {
  const navigation = useNavigation()
  const [value, setValue] = useState<string>("")
  const _storeData = async () => {
    if (value.length) {
      await save("objective", value)
      navigation.navigate("ObjectiveSupPageTwo" as never)
    }
  }
  return (
    <ScrollView>
      <View>
        <Text> What's your Goal ? </Text>
        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
          <RadioButton.Item label="Lose Weight" value="1" />
          <RadioButton.Item label="Maintain Weight" value="2" />
          <RadioButton.Item label="Gain Weight" value="3" />
        </RadioButton.Group>
      </View>
      <View >
        <Button text="NEXT" onPress={_storeData} />
      </View>
    </ScrollView>
  )
}

export { ObjectiveSupPageOne }
