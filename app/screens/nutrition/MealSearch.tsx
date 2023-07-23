import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  Alert,
} from "react-native"
import { useNutrition } from "../../context"
import { ApiResponseNutrition, searchMeal } from "../../services/api"
import { Meal, updateNutriments } from "../../context/types"
import { Searchbar } from "react-native-paper"
import FoodElement from "../../components/FoodElement"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Header, Screen } from "../../components"
import { useNavigation } from "@react-navigation/native"



const MealSearch = () => {

  const [searchResult, setSearchResult] = useState<Meal[]>([])
  const navigator = useNavigation()
  const [searchQuery, setSearchQuery] = useState<string>("")
  console.log(searchResult)

  const nutrition = useNutrition()

  const setSearchMeal = (text: string ) => {
    setSearchQuery(text)
    if (text.length < 3) {
      setSearchResult([])
    }
    else {
      runSearch(text)
    }
  }
  const runSearch = async (searchPhrase: string) => {
    try {
      const response = await searchMeal(searchPhrase)
      if (response.ok) {
        const data = response.data as ApiResponseNutrition
        const result: Meal[] = []
        for (const product of data.products) {
          result.push(updateNutriments(product))
        }
        console.log(result)
        setSearchResult(result)
      } else {
        Alert.alert("Error", "Product not found")
      }
    } catch (error) {
    }
  }

  const searchList = () => {
    let i = 0
    return searchResult.map(res => {
      const updatedRes = updateNutriments(res)
      return (
        <FoodElement
          value={updatedRes}
          key={i++}
          onPress={() => {
            nutrition.setLastSeenProduct(updatedRes)
          }}
        />
      )
    })
  }

  return (
    <Screen preset={"scroll"}>
      <Header title="Rechercher un aliment" />
      <View style={style.topView}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchMeal}
          value={searchQuery}
        />
      </View>
      <View style={style.noSearchPhrase}>
        <Pressable
          style={style.scanButton}
          onPress={() => {
            navigator.navigate("BarcodeScanner" as never)
          }}>
          <MaterialCommunityIcons
            name="barcode-scan"
            size={60}
            color="#F80"
            style={style.scanButtonIcon} />
          <Text style={style.scanButtonText}>Numériser un code-barre</Text>
        </Pressable>
        <Pressable style={style.scanButton}>
          <MaterialCommunityIcons
            name="progress-question"
            size={60}
            color="#F80"
            style={style.scanButtonIcon} />
          <Text style={style.scanButtonText}>??????</Text>
        </Pressable>
      </View>
        <Text style={style.title}>Résultats de la recherche</Text>
          {searchList()}


    </Screen>
  )
}

const style = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height * 1.15,
    backgroundColor: "#f2f3f3",
  },
  topView: {
    backgroundColor: "white",
  },
  noSearchPhrase: {
    backgroundColor: "#FED",
    display: "flex",
    flex : 1,
    flexDirection: "row",
  },
  noResult: {},
  results: {
    height: Dimensions.get("window").height * 3,
  },
  searchButton: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  searchButtonIcon: {
    backgroundColor: "#FC7",
    padding: 2,
    marginRight: 10,
    borderRadius: 100,
  },
  searchButtonText: {
    color: "#F80",
    width: "90%",
  },
  scanButton: {
    margin: Dimensions.get("window").width * 0.025,
    width: Dimensions.get("window").width * 0.45,
    height: Dimensions.get("window").height * 0.2,
    backgroundColor: "white",
    borderRadius: 20,
  },
  scanButtonIcon: {
    marginTop: "10%",
    textAlign: "center",
  },
  scanButtonText: {
    color: "#F80",
    marginHorizontal: 10,
    fontSize: 16,
    marginVertical: 5,
    textAlign: "center",
  },
  title: {
    color: "black",
    margin: Dimensions.get("window").width * 0.025,
    fontWeight: "bold",
    fontSize: 16,
  },
})

export { MealSearch }
