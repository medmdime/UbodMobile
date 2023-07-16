import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { AutoImage } from "../../components"

const Sport = () => {
  return (
    <View >
      <AutoImage
        source={require("assets/icons/icons8-services-96.png")}
        style={{ width: 200, height: 200, tintColor: 'gray' }}
      />
      <Text >
        {'Sport \n\n'}
      </Text>
    </View>
  );
};
export { Sport };
