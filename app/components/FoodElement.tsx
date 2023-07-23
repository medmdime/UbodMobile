import React, { FC } from 'react';
import { Text, View, StyleSheet, Pressable, Dimensions } from "react-native"
import { Meal } from "../context/types"
import { AutoImage } from "./AutoImage"

// Define interfaces for the prop


interface FoodElementProps {
  value: Meal;
  onPress: () => void;
}

const FoodElement: FC<FoodElementProps> = ({ value, onPress }) => {
  const name = value.product_name ?? 'product n° ' + value._id;
  const energy = value.nutrimentsPortion?.['energy-kcal'] ?? '??';
  const energyUnit = value.nutrimentsPortion?.['energy-kcal'] ? 'kcal' : '';

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.textContainer}>
          <Text style={styles.textmain}>{name}</Text>
          <Text style={styles.textsec}> {100 * value.portion}g</Text>
          <Text style={styles.textsec}>{energy} {energyUnit}</Text>
      </View>
      <AutoImage source={{uri:  value.image_url }} style={{ width: 50, height: 50 }} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: Dimensions.get('window').width * 0.025,
    paddingVertical: 13,
    paddingHorizontal: Dimensions.get('window').width * 0.04,
    backgroundColor: '#FFF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: Dimensions.get('window').width * 0.6,
  },
  textmain: {
    color: 'black',
    fontSize: 14,
  },
  textsec: {
    color: '#AAA',
    fontSize: 14,
  },
});

export default FoodElement;
