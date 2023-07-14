import React, { useState } from "react"
import {
  View,
  ScrollView,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Button, Text } from "../../../components"
import { saveString } from "../../../utils/storage"
import { RadioButton } from "react-native-paper"
import { translate } from "../../../i18n"


const ObjectiveSupPageOne = () => {
  const navigation = useNavigation()
  const [value, setValue] = useState<string>("")
  const _storeData = async () => {
    if (value.length) {
      await saveString("objective", value)
      navigation.navigate("ObjectiveSupPageTwo" as never)
    }
  }
  return (
    <ScrollView>
      <View>
        <Text tx={"SignUp.ObjectiveSupPageOne.title"} txOptions={{tx:"SignUp.ObjectiveSupPageOne.title"}}/>
        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
          <RadioButton.Item label={translate("SignUp.ObjectiveSupPageOne.labelOne", {tx:"SignUp.ObjectiveSupPageOne.labelOne"})} value="1" />
          <RadioButton.Item label={translate("SignUp.ObjectiveSupPageOne.labelTwo", {tx:"SignUp.ObjectiveSupPageOne.labelTwo"})} value="2" />
          <RadioButton.Item label={translate("SignUp.ObjectiveSupPageOne.labelThree", {tx:"SignUp.ObjectiveSupPageOne.labelThree"})} value="3" />
        </RadioButton.Group>
      </View>
      <View >
        <Button tx={"common.Next"} txOptions={{tx:"common.Next"}} onPress={_storeData} />
      </View>
    </ScrollView>
  )
}

export { ObjectiveSupPageOne }
