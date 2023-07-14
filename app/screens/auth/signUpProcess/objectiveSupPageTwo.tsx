import React, { useState } from "react"
import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { RadioButton } from "react-native-paper"
import { Button, Screen, Text } from "../../../components"
import { saveString } from "../../../utils/storage"
import { translate } from "../../../i18n"


const ObjectiveSupPageTwo = () => {
  const navigation = useNavigation()
  const [value, setValue] = useState<string>("")
  const _storeData = async () => {
    if (value) {
      await saveString("activity_level", value)
      navigation.navigate("ObjectiveSupPageThree" as never)
    }
  }
  return (
    <Screen>
      <View>
        <Text tx={"SignUp.ObjectiveSupPageTwo.title"} txOptions={{tx:"SignUp.ObjectiveSupPageTwo.title"}}/>
        <Text tx={"SignUp.ObjectiveSupPageTwo.subtitle"} txOptions={{tx:"SignUp.ObjectiveSupPageTwo.subtitle"}}/>
        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
          <RadioButton.Item label={translate("SignUp.ObjectiveSupPageTwo.labelOne", {tx:"SignUp.ObjectiveSupPageTwo.labelOne"})} value="1" />
          <RadioButton.Item label={translate("SignUp.ObjectiveSupPageTwo.labelTwo", {tx:"SignUp.ObjectiveSupPageTwo.labelTwo"})} value="2" />
          <RadioButton.Item label={translate("SignUp.ObjectiveSupPageTwo.labelThree", {tx:"SignUp.ObjectiveSupPageTwo.labelThree"})} value="3" />
          <RadioButton.Item label={translate("SignUp.ObjectiveSupPageTwo.labelFour", {tx:"SignUp.ObjectiveSupPageTwo.labelFour"})} value="4" />
        </RadioButton.Group>
      </View>
      <Button tx={"common.Next"} txOptions={{tx:"common.Next"}} onPress={_storeData} />
    </Screen>
  )
}

export { ObjectiveSupPageTwo }