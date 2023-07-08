import React, { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { RadioButton } from "react-native-paper"
import { Button } from "../../../components"
import { save } from "../../../utils/storage"


const ObjectiveSupPageTwo = () => {
  const navigation = useNavigation()
  const [value, setValue] = useState<string>("")
  const _storeData = async () => {
    if (value) {
      await save("activity_level", value)
      navigation.navigate("ObjectiveSupPageThree" as never)
    }
  }
  return (
    <ScrollView>
      <View>
        <Text>
          What is your daily level of activity ?
        </Text>
        <Text>
          Without counting your training sessions.
        </Text>
        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
          <RadioButton.Item label="Not Active" value="1" />
          <RadioButton.Item label="Moderately Active" value="2" />
          <RadioButton.Item label="Active" value="3" />
          <RadioButton.Item label="Very Active" value="4" />
        </RadioButton.Group>
      </View>
      <Button text="NEXT" onPress={_storeData} />
    </ScrollView>
  )
}

export { ObjectiveSupPageTwo }
