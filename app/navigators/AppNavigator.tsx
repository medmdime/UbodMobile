/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import {
  WelcomeScreen,
  SignInScreen,
  ForgetPassword,
  ObjectiveSupPageOne,
  ObjectiveSupPageTwo,
  ObjectiveSupPageThree,
  ObjectiveSupPageFour,
  ObjectiveSupPageFive,
  Profile,
  LoadingScreen,
  Home,
  Sport,
  Nutrition,
  BarcodeScanner,
  MealSearch
} from "../screens"
import { useLogin } from "../context"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AutoImage } from "../components"


/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: React.FC
  SignInScreen: React.FC
  ForgetPassword: React.FC
  ObjectiveSupPageOne: React.FC
  ObjectiveSupPageTwo: React.FC
  ObjectiveSupPageThree: React.FC
  ObjectiveSupPageFour: React.FC
  ObjectiveSupPageFive: React.FC
  BottomTabNavigator: React.FC
  Profile: React.FC
  Sports: React.FC
  Home: React.FC
  Nutrition: React.FC
  LoadingScreen: React.FC
  BarcodeScanner: React.FC
  MealSearch: React.FC
}


/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()
const BottomTab = createBottomTabNavigator<AppStackParamList>()

const BottomTabNavigator = observer(function AppStack() {
  return (
    <BottomTab.Navigator
      screenOptions={{ headerShown: true }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIconStyle: { width: 30, height: 30 },
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return (
              <AutoImage
                source={require("assets/icons/icons8-home-100.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            )
          },
        }}
      />
      <BottomTab.Screen
        name="Sports"
        component={Sport}
        options={{
          tabBarIconStyle: { width: 30, height: 30 },
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return (
              <AutoImage
                source={require("assets/icons/icons8-deadlift-90.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            )
          },
        }}
      />
      <BottomTab.Screen
        name="Nutrition"
        component={Nutrition}
        options={{
          tabBarIconStyle: { width: 30, height: 30 },
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return (
              <AutoImage
                source={require("assets/icons/icons8-salad-100.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            )
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIconStyle: { width: 30, height: 30 },
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return (
              <AutoImage
                source={require("assets/icons/icons8-services-96.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            )
          },
        }}
      />



    </BottomTab.Navigator>
  )
})

const AppStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, navigationBarColor: colors.background }}
    >
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} options={{ headerShown: true }} />
      <Stack.Screen name="MealSearch" component={MealSearch} options={{ headerShown: true }} />
    </Stack.Navigator>
  )
}

const AuthStack = observer(function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, navigationBarColor: colors.background }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ObjectiveSupPageOne" component={ObjectiveSupPageOne} />
      <Stack.Screen name="ObjectiveSupPageTwo" component={ObjectiveSupPageTwo} />
      <Stack.Screen name="ObjectiveSupPageThree" component={ObjectiveSupPageThree} />
      <Stack.Screen name="ObjectiveSupPageFour" component={ObjectiveSupPageFour} />
      <Stack.Screen name="ObjectiveSupPageFive" component={ObjectiveSupPageFive} />
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {
}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))
  const { isLogged, loginPending } = useLogin()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      {loginPending ? <LoadingScreen /> :
        isLogged ? <AppStack /> : <AuthStack />
      }
    </NavigationContainer>
  )
})
