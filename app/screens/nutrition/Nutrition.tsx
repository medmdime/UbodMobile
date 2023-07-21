import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Card } from "../../components"
import { useUserNutrition } from "../../context/UserCalorieIntake"
import { SwipeListView } from "react-native-swipe-list-view"

const Nutrition = () => {
  const {
    Breakfast,
    setLunch,
    Lunch,
    setBreakfast,
    Dinner,
    setDinner,
    Snack,
    setSnack,
    targetCalories,
    foodCalories,
    setLastSeenProduct,
    setLastMeal,
  } = useUserNutrition();



  const deleteItem = (mealType, index) => {
    if (mealType === 'breakfast') {
      const newBreakfast = [...Breakfast];
      newBreakfast.splice(index, 1);
      setBreakfast(newBreakfast);
    } else if (mealType === 'lunch') {
      const newLunch = [...Lunch];
      newLunch.splice(index, 1);
      setLunch(newLunch);
    } else if (mealType === 'dinner') {
      const newDinner = [...Dinner];
      newDinner.splice(index, 1);
      setDinner(newDinner);
    } else if (mealType === 'snack') {
      const newSnack = [...Snack];
      newSnack.splice(index, 1);
      setSnack(newSnack);
    }
  };


  const renderItem = data => (
    <Card
      key={`${data.item.mealType}-${data.index}`}
      content={data.item}
      onPress={() => {
        setLastSeenProduct(data.item);
      }}
    />
  );
  const mealTypeKeyExtractor = item => item.title;

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          const mealType = data.item.mealType;
          deleteItem(mealType, data.index);
          rowMap[`${data.item?.mealType}-${data.index}`]?.closeRow();
        }}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );



  const renderMealType = ({item}) => (
    <View style={styles.CalorieContainerSecondary}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <SwipeListView
        data={item.data?.map(food => ({
          ...food,
          mealType: item.title.toLowerCase(),
        }))}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        keyExtractor={(item : any, index) => `${item.mealType}-${index}`}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setLastMeal(item.title);
        }}>
        <Text style={styles.addButtonText}>ADD FOOD</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <View style={styles.container}>

        <View style={styles.CalorieContainerPrimary}>
          <Text style={styles.title}>Calories Available</Text>
          <View style={styles.CalorieBanner}>
            <View style={styles.objectiveCalories}>
              <Text style={styles.text}>{Math.round(targetCalories)}</Text>
              <Text style={styles.Lowertext}> Objective </Text>
            </View>
            <Text style={styles.icones} > + </Text>

            <View style={styles.objectiveCalories}>
              <Text style={styles.text}>{Math.round(foodCalories)}</Text>
              <Text style={styles.Lowertext}> Food </Text>
            </View>
            <Text style={styles.icones}> = </Text>
            <View style={styles.objectiveCalories}>
              <Text style={styles.textPrimary}>
                {Math.round(targetCalories - foodCalories)}
              </Text>
              <Text style={styles.Lowertext}> Available </Text>
            </View>
          </View>
        </View>
        <FlatList
                  data={[
                    {title: 'Breakfast', data: Breakfast},
                    {title: 'Lunch', data: Lunch},
                    {title: 'Dinner', data: Dinner},
                    {title: 'Snack', data: Snack},

                  ]}
                  renderItem={renderMealType}
                  keyExtractor={mealTypeKeyExtractor}
        />

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  CalorieBanner: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    // eslint-disable-next-line react-native/no-color-literals
  },CalorieContainerPrimary: {
    backgroundColor: 'white',
    marginBottom: 50,
    padding: 10,
  },

  // eslint-disable-next-line react-native/no-color-literals
  CalorieContainerSecondary: {
    backgroundColor: 'white',
    marginBottom: 20,
  },
  // eslint-disable-next-line react-native/no-color-literals
  Lowertext: {
    color: 'black',
    fontSize: 14,
    fontWeight: '300',

  },
  // eslint-disable-next-line react-native/no-color-literals
  addButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#F80',
    borderRadius: 5,
    marginBottom: 10,
    marginRight: 5,
    marginTop: 10,
    padding: 5,

  },
  // eslint-disable-next-line react-native/no-color-literals
  addButtonText: {
    color: 'white',
    fontWeight: '500',

  },
  container: {
    height: '100%',
    // eslint-disable-next-line react-native/no-color-literals
  },deleteButton: {
    alignItems: 'center',
    backgroundColor: 'red',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 75,
  },
  // eslint-disable-next-line react-native/no-color-literals
  deleteButtonText: {
    color: '#FFF',
  },
  // eslint-disable-next-line react-native/no-color-literals
  icones :{
    color: '#c4c4c4',
  },
  objectiveCalories: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  // eslint-disable-next-line react-native/no-color-literals
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  // eslint-disable-next-line react-native/no-color-literals
  text: {
    color: 'darkgrey',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,

  },
  // eslint-disable-next-line react-native/no-color-literals
  textPrimary: {
    color: '#F80',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  // eslint-disable-next-line react-native/no-color-literals
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: '300',
    padding: 10,
  },
  // eslint-disable-next-line react-native/no-color-literals
  titleContainer: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    flex: 1,

  },

});

export { Nutrition };
