import React from "react"
import { View, StyleSheet, Image, ViewStyle, TextStyle, ImageBackground } from "react-native"
import { Button, Text } from "../components"
import { colors, spacing, typography } from "../theme"
// @ts-ignore
import Logo from "assets/images/imageWithoutText.png"
// @ts-ignore
import background from "assets/images/colorful-shades-abstract-background.jpg"
import { useNavigation } from "@react-navigation/native"

const WelcomeScreen = () => {
  const navigation = useNavigation()
  const $baseViewStylebuttonOne: ViewStyle = {
    minHeight: 56,
    borderRadius: 10,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    overflow: "hidden",
    marginBottom: 10,
  }
  const $baseViewStylebuttonTwo: ViewStyle = {
    minHeight: 56,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "transparent",
  }
  const $baseTextStyle: TextStyle = {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: typography.primary.semiBold,
    textAlign: "center",
    flexShrink: 1,
    flexGrow: 0,
    zIndex: 2,
  }
  const $baseTextStyletwo: TextStyle = {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: typography.primary.semiBold,
    textAlign: "center",
    flexShrink: 1,
    flexGrow: 0,
    zIndex: 2,
    color: "white",
  }

  function signIn(): void {
    navigation.navigate('SignInScreen' as never)
  }
  function signUp(): void {
    navigation.navigate('ObjectiveSupPageOne' as never)
  }

  return (
    <>
      <ImageBackground source={background} style={style.background}>
        <View style={style.logoTopLeft}>
          <Image source={Logo} style={style.logo} resizeMode="contain" />
        </View>
        <View style={style.background}>
          <Text style={style.text} size={"xl"} weight={"semiBold"}> UBOD </Text>
        </View>
        <View style={style.footer}>
          <Button style={$baseViewStylebuttonOne} textStyle={$baseTextStyle}
                  text="SIGN UP FOR FREE"
                  onPress={signUp}
          />
          <Button text="SIGN IN" style={$baseViewStylebuttonTwo} textStyle={$baseTextStyletwo}
                  pressedStyle={$baseViewStylebuttonOne}
                  onPress={signIn}
          />
        </View>
      </ImageBackground>
    </>
  )
}

const style = StyleSheet.create({
  background: {
    alignItems: "center",
    flex: 2,
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-start",
    padding: "2.5%",
    width: "100%",
  },
  // eslint-disable-next-line react-native/no-color-literals
  logo: {
    backgroundColor: colors.transparent,
    margin: "5%",
    maxHeight: 50,
    maxWidth: 50,
    tintColor: colors.black,
  },
  logoTopLeft: {
    alignItems: "flex-start",
    flex: 1,
    justifyContent: "flex-start",
    marginTop: "10%",
    width: "100%",
  },
  text: {
    color: colors.background,
  },
})

export { WelcomeScreen }



