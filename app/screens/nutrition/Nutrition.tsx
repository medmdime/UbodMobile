import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { AutoImage } from "../../components"

const Nutrition = () => {
  return (
    <View >
      <AutoImage
        source={require("assets/icons/icons8-salad-100.png")}
        style={{ width: 200, height: 200, tintColor: 'gray' }}
      />
      <Text >
        {'Nutrition \n\n'}
      </Text>
    </View>
  );
};
export { Nutrition };
