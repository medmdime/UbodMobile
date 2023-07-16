import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { AutoImage } from "../../components"

const Home = () => {
  return (
    <View >
      <AutoImage
        source={require("assets/icons/icons8-home-100.png")}
        style={{ width: 200, height: 200, tintColor: 'gray' }}
      />
      <Text >
        {'Home \n\n'}
      </Text>
    </View>
  );
};
export { Home };
