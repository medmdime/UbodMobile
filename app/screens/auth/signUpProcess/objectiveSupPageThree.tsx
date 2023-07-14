import React, { useState } from "react"
import {
  Text,
  View,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Button, CountrySelect, Screen, TextField } from "../../../components"
import { RadioButton } from "react-native-paper"
import { saveString } from "../../../utils/storage"
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"
import { format } from "date-fns"

const ObjectiveSupPageThree = () => {
  const navigation = useNavigation();
  const [date , setDate] = useState<Date>(new Date());
  const [gender, setGender] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const setDateEvent = (event: DateTimePickerEvent, date: Date) => {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      type,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      nativeEvent : { timestamp },
    } = event;
    setDate(date);
  };

  const _storeData = async () => {
    if (date.toString() !== new Date().toString() && place !== "" && code !== "") {
      await saveString("gender", gender)
      await saveString("date_birth", format(date, 'yyyy-MM-dd\'T\'HH') )
      await saveString("address", place)
      await saveString("address", place)
      await saveString("zipcode", code)
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
        <RNDateTimePicker
          mode="date"
          dateFormat="shortdate"
          onChange={setDateEvent}
          maximumDate={new Date(2004, 1, 1)}
          minimumDate={new Date(1950, 1, 1)}
          value={date}
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
