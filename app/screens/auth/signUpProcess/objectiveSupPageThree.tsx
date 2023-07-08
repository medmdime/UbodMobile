import React, { useState } from "react"
import {
  Text,
  View,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Button, CountrySelect, Screen, TextField } from "../../../components"
import { RadioButton } from "react-native-paper"
import { save } from "../../../utils/storage"
import DateTimePicker from "@react-native-community/datetimepicker"

const ObjectiveSupPageThree = () => {
  const navigation = useNavigation()
  const [date, setDate] = useState(new Date())
  const [gender, setGender] = useState<string>("")
  const [place, setPlace] = useState<string>("")
  const [code, setCode] = useState<string>("")
  const _storeData = async () => {
    if (date !== new Date() && place !== "" && code !== "") {
      await save("gender", gender)
      await save("date_birth", date)
      await save("address", place)
      await save("zipcode", code)
      navigation.navigate("ObjectiveSupPageFour" as never)
    }
  }
  return (
    <Screen preset={"scroll"}>
      <Text> What's Your Gender?</Text>
      <Text>
        Calorie needs depends on the gender.
      </Text>
      <View>
        <RadioButton.Group onValueChange={gender => setGender(gender)} value={gender}>
          <RadioButton.Item label="Male" value="1" />
          <RadioButton.Item label="Female" value="2" />
          <RadioButton.Item label="Other" value="3" />
        </RadioButton.Group>
        <Text>
          When were you born ?
        </Text>
        <DateTimePicker
          mode="date"
          value={date}
          onChange={() => setDate}
        />
        <Text> Where do you live ?</Text>
        <View>
          <CountrySelect selected={place} setSelected={setPlace} Mode={"MODAL"} />
        </View>
        <View>
          <Text> What is your postal code ?</Text>
          <TextField
            placeholder="Postal code"
            placeholderTextColor="#ccc"
            value={code}
            onChangeText={setCode}
            multiline={false}
            numberOfLines={1}
            keyboardType="number-pad"
          />
        </View>
      </View>
      <Button text="NEXT" onPress={_storeData} />
    </Screen>
  )
}
export { ObjectiveSupPageThree }
