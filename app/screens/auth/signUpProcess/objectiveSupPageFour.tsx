import React, { useState } from "react"
import {
  View,
  Alert,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Button, Screen, TextField, Text } from "../../../components"
import { loadString, saveString } from "../../../utils/storage"
import { translate } from "../../../i18n"

const ObjectiveSupPageFour = () => {
  const navigation = useNavigation()
  const [High, setHigh] = useState<string>('');
  const [weight, setWeigh] = useState<string>('');
  const [iDwight, setIDwight] = useState<string>('');
  const [objective, setObjective] = useState<string>('');

  const validateHeight = (h) => {
    if (h > 300 || h < 100) {
      Alert.alert(translate("SignUp.ObjectiveSupPageFour.alertValidHeight"));
      return false;
    }
    return true;
  }

  const validateWeight = (w) => {
    if (w > 300 || w < 30) {
      Alert.alert(translate("SignUp.ObjectiveSupPageFour.alertValidWeight"));
      return false;
    }
    return true;
  }

  const validateIdealWeight = (iw, w, objective) => {
    if (iw > 300 || iw < 30) {
      Alert.alert(translate("SignUp.ObjectiveSupPageFour.alertValidIdealWeight"));
      return false;
    }
    if ((objective === "1" && w < iw) ||
      (objective === "3" && w > iw) ||
      (objective === "2" && (iw < w - 5 || iw > w + 5))) {
      Alert.alert(translate("SignUp.ObjectiveSupPageFour.alertValidIdealWeightCondition"));
      return false;
    }
    return true;
  }

  const onSend = async () => {
    if (High.length && weight.length && iDwight.length) {
      const h = parseInt(High);
      const w = parseInt(weight);
      const iw = parseInt(iDwight);

      if (!validateHeight(h) || !validateWeight(w) || !validateIdealWeight(iw, w, objective)) {
        return;
      }

      await saveString("height", High);
      await saveString("weight", weight);
      await saveString("weight_obj", iDwight);

      navigation.navigate("ObjectiveSupPageFive" as never);
    }
  }

  loadString("objective").then(value => {
    if (value) {
      setObjective(value)
    } else {
      Alert.alert(translate("SignUp.ObjectiveSupPageFour.alertError"));
    }
  })

  return (
    <Screen preset={"scroll"}>
      <View>
        <Text tx={"SignUp.ObjectiveSupPageFour.titleHeight"} />
        <TextField
          keyboardType="number-pad"
          placeholder={translate("SignUp.ObjectiveSupPageFour.placeholderHeight")}
          value={High}
          placeholderTextColor="#ccc"
          onChangeText={setHigh}
          multiline={true}
          numberOfLines={1}
        />
        <Text tx={"SignUp.ObjectiveSupPageFour.titleWeight"} />
        <TextField
          keyboardType="number-pad"
          placeholder={translate("SignUp.ObjectiveSupPageFour.placeholderWeight")}
          placeholderTextColor="#ccc"
          value={weight}
          onChangeText={setWeigh}
          multiline={true}
          numberOfLines={1}
        />
        <Text tx={"SignUp.ObjectiveSupPageFour.titleIdealWeight"} />
        <TextField
          keyboardType="number-pad"
          placeholder={translate("SignUp.ObjectiveSupPageFour.placeholderIdealWeight")}
          value={iDwight}
          placeholderTextColor="#ccc"
          onChangeText={setIDwight}
          multiline={true}
          numberOfLines={1}
        />
      </View>

      <View>
        <Button tx={"common.Next"} onPress={onSend} />
      </View>
    </Screen>
  )
}
export { ObjectiveSupPageFour }
