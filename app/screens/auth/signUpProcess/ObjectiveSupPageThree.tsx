import React, { useState } from "react"
import {
  View,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Button, CountrySelect, Screen, TextField ,DatePicker, Text} from "../../../components"
import { PaperProvider, RadioButton } from "react-native-paper"
import { saveString } from "../../../utils/storage"
import { format } from "date-fns"
import { formatDate } from "../../../utils/formatDate"
import { translate } from "../../../i18n"

const ObjectiveSupPageThree = () => {
  const navigation = useNavigation();
  const [date , setDate] = useState<Date>(new Date());
  const [gender, setGender] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const _storeData = async () => {
    if (date.toString() !== new Date().toString() && place !== "" && code !== "") {
      await saveString("gender", gender)
      await saveString("date_birth", date.toISOString())
      await saveString("address", place)
      await saveString("zipcode", code)
      navigation.navigate("ObjectiveSupPageFour" as never)
    }
  }


  const showMode = () => {
    setShow(!show);
  };


  return (
    <PaperProvider>
      <Screen preset="scroll"  >
        <Text tx={"SignUp.ObjectiveSupPageThree.titleGender"} txOptions={{tx:"SignUp.ObjectiveSupPageThree.titleGender"}}/>
        <Text tx={"SignUp.ObjectiveSupPageThree.subtitleGender"} txOptions={{tx:"SignUp.ObjectiveSupPageThree.subtitleGender"}}/>
        <View>
          <RadioButton.Group onValueChange={gender => setGender(gender)} value={gender}>
            <RadioButton.Item label={translate("SignUp.ObjectiveSupPageThree.labelMale", {tx:"SignUp.ObjectiveSupPageThree.labelMale"})} value="1" />
            <RadioButton.Item label={translate("SignUp.ObjectiveSupPageThree.labelFemale", {tx:"SignUp.ObjectiveSupPageThree.labelFemale"})} value="2" />
            <RadioButton.Item label={translate("SignUp.ObjectiveSupPageThree.labelOther", {tx:"SignUp.ObjectiveSupPageThree.labelOther"})} value="3" />
          </RadioButton.Group>
          <Text tx={"SignUp.ObjectiveSupPageThree.titleBirth"} txOptions={{tx:"SignUp.ObjectiveSupPageThree.titleBirth"}}/>
          <Screen>
            <Button onPress={showMode} text={`selected: ${formatDate(format(date, 'yyyy-MM-dd\'T\'HH'))}`} />
            {/* //TODO : fix the date picker pour android */}
            <DatePicker show={show} setShow={setShow} date={date} setDate={setDate} />
          </Screen>
          <Text tx={"SignUp.ObjectiveSupPageThree.titleLive"} txOptions={{tx:"SignUp.ObjectiveSupPageThree.titleLive"}}/>
            <CountrySelect selected={place} setSelected={setPlace} Mode={"MODAL"} />
          <View>
            <Text tx={"SignUp.ObjectiveSupPageThree.titlePostalCode"} txOptions={{tx:"SignUp.ObjectiveSupPageThree.titlePostalCode"}}/>
            <TextField
              placeholderTextColor="#ccc"
              placeholderTx={"SignUp.ObjectiveSupPageThree.placeholderPostalCode"}
              placeholderTxOptions={{tx:"SignUp.ObjectiveSupPageThree.placeholderPostalCode"}}
              value={code}
              onChangeText={setCode}
              multiline={false}
              numberOfLines={1}
              keyboardType="number-pad"
            />
          </View>
        </View>
        <Button tx={"common.Next"} txOptions={{tx:"common.Next"}} onPress={_storeData} />
      </Screen>
    </PaperProvider>
  )
}
export { ObjectiveSupPageThree }
